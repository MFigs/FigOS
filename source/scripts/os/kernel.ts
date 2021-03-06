/* ------------
     Kernel.ts

     Requires globals.ts

     Routines for the Operating System, NOT the host.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Kernel {
        //
        // OS Startup and Shutdown Routines
        //

        public memManager: TSOS.MemoryManager = new MemoryManager();

        public krnBootstrap() {      // Page 8. {
            Control.hostLog("bootstrap", "host");  // Use hostLog because we ALWAYS want this, even if _Trace is off.

            // Initialize our global queues.
            _KernelInterruptQueue = new Queue();  // A (currently) non-priority queue for interrupt requests (IRQs).
            _KernelBuffers = new Array();         // Buffers... for the kernel.
            _KernelInputQueue = new Queue();      // Where device input lands before being processed out somewhere.
            _Console = new Console();          // The command line interface / console I/O device.

            // Initiate Ready Queue
            _ReadyQueue = new TSOS.Queue();

            // Initialize the console.
            _Console.init();

            _Display = new TSOS.Display();

            _MemLoadedTable = [];
            for (var i = 0; i < 3; i++)
                _MemLoadedTable[i] = 0;

            //TODO: Replace current multi-variable time format below, possible simplified implementation of date/time formatting that already exists

            setInterval(function(){

                var cDate = new Date();
                var cDay = cDate.getDate();
                var cMonth = cDate.getMonth() + 1;
                var cYear = cDate.getFullYear();

                var cTimeHr = cDate.getHours();
                var cTimeMin = cDate.getMinutes();
                var cAMvPM = "AM";

                if (cTimeMin < 10) {
                    var cTimeMinStr = "0" + cTimeMin;
                }
                else {
                    var cTimeMinStr = "" + cTimeMin;
                }

                if (cTimeHr === 0) {
                    cTimeHr = 12;
                }

                if (cTimeHr > 11) {
                    cAMvPM = "PM";
                    if (cTimeHr > 12) {
                        cTimeHr = cTimeHr % 12;
                    }
                }

                var dateTimeString = cMonth + "/" + cDay + "/" + cYear + " " + cTimeHr + ":" + cTimeMinStr + " " + cAMvPM;
                document.getElementById("dateTimeOutput").innerHTML = dateTimeString;
                document.getElementById("statusOutput").innerHTML = _Status;
            }, 1000);

            // Initialize standard input and output to the _Console.
            _StdIn  = _Console;
            _StdOut = _Console;


            this.updateState();

            // Load the Keyboard Device Driver
            this.krnTrace("Loading the keyboard device driver.");
            _krnKeyboardDriver = new DeviceDriverKeyboard();     // Construct it.
            _krnKeyboardDriver.driverEntry();                    // Call the driverEntry() initialization routine.
            this.krnTrace(_krnKeyboardDriver.status);

            // Load the HDD Devide Driver
            this.krnTrace("Loading the HDD device driver.");
            _krnHDDDriver = new TSOS.DeviceDriverHDD();
            _krnHDDDriver.krnHDDDriverEntry();                   // Call the driverEntry() initialization routine.
            this.krnTrace(_krnHDDDriver.status);

            //
            // ... more?
            //

            // Enable the OS Interrupts.  (Not the CPU clock interrupt, as that is done in the hardware sim.)
            this.krnTrace("Enabling the interrupts.");
            this.krnEnableInterrupts();

            // Launch the shell.
            this.krnTrace("Creating and Launching the shell.");
            _OsShell = new Shell();
            _OsShell.init();

            // Initiate Resident Process List
            _ResidentPCBList = [];

            // Initiate Resident PCB List
            _PCBArray = [];

            _TerminatedProcessList = [];

            // Initialize the Process Scheduler
            _ProcessScheduler = new TSOS.ProcessScheduler;

            // Finally, initiate testing.
            if (_GLaDOS) {
                _GLaDOS.afterStartup();
            }
        }

        public krnShutdown() {
            this.krnTrace("begin shutdown OS");
            // TODO: Check for running processes.  Alert if there are some, alert and stop.  Else...
            // ... Disable the Interrupts.
            this.krnTrace("Disabling the interrupts.");
            this.krnDisableInterrupts();
            //
            // Unload the Device Drivers?
            // More?
            //
            this.krnTrace("end shutdown OS");
        }


        public krnOnCPUClockPulse() {
            /* This gets called from the host hardware sim every time there is a hardware clock pulse.
               This is NOT the same as a TIMER, which causes an interrupt and is handled like other interrupts.
               This, on the other hand, is the clock pulse from the hardware (or host) that tells the kernel
               that it has to look for interrupts and process them if it finds any.                           */

            // Check for an interrupt, are any. Page 560
            if (_KernelInterruptQueue.getSize() > 0) {
                // Process the first interrupt on the interrupt queue.
                // TODO: Implement a priority queue based on the IRQ number/id to enforce interrupt priority.
                var interrupt = _KernelInterruptQueue.dequeue();
                this.krnInterruptHandler(interrupt.irq, interrupt.params);
            } else if (_CPU.isExecuting) { // If there are no interrupts then run one CPU cycle if there is anything being processed. {
                _CPU.cycle();
            } else {                      // If there are no interrupts and there is nothing being executed then just be idle. {
                this.krnTrace("Idle");
                this.updateState();
            }
        }


        //
        // Interrupt Handling
        //
        public krnEnableInterrupts() {
            // Keyboard
            Devices.hostEnableKeyboardInterrupt();
            // Put more here.
        }

        public krnDisableInterrupts() {
            // Keyboard
            Devices.hostDisableKeyboardInterrupt();
            // Put more here.
        }

        public krnInterruptHandler(irq, params) {
            // This is the Interrupt Handler Routine.  Pages 8 and 560. {
            // Trace our entrance here so we can compute Interrupt Latency by analyzing the log file later on.  Page 766.
            this.krnTrace("Handling IRQ~" + irq);

            // Invoke the requested Interrupt Service Routine via Switch/Case rather than an Interrupt Vector.
            // TODO: Consider using an Interrupt Vector in the future.
            // Note: There is no need to "dismiss" or acknowledge the interrupts in our design here.
            //       Maybe the hardware simulation will grow to support/require that in the future.
            switch (irq) {
                case TIMER_IRQ:
                    this.krnTimerISR();              // Kernel built-in routine for timers (not the clock).
                    break;
                case KEYBOARD_IRQ:
                    _krnKeyboardDriver.isr(params);   // Kernel mode device driver
                    _StdIn.handleInput();
                    break;
                case TIMER_KILL_ACTIVE_IRQ:
                    this.krnTimerKillActiveProcISR();
                    break;
                case USER_PROCESS_KILL_IRQ:
                    this.krnProcessKillISR(params);
                    break;
                default:
                    this.krnTrapError("Invalid Interrupt Request. irq=" + irq + " params=[" + params + "]");
            }
        }

        public krnTimerISR() {
            // The built-in TIMER (not clock) Interrupt Service Routine (as opposed to an ISR coming from a device driver). {
            // Check multiprogramming parameters and enforce quanta here. Call the scheduler / context switch here if necessary.

            _ProcessScheduler.contextSwitch();

        }

        public krnTimerKillActiveProcISR() {

        _ProcessScheduler.contextSwitchDrop();

        }

        public krnProcessKillISR(params) {

            //console.log("Entered Kill Process ISR");
            var pid: number = params[0];
            //console.log("PARAM: " + pid);
            if (_CPU.currentPID == pid) {
                //console.log("Current Process Ended");
                _KernelInterruptQueue.enqueue(new Interrupt(TIMER_KILL_ACTIVE_IRQ, null));
                _PCBArray[pid].procStatus = "Terminated";
                _TerminatedProcessList[pid] = 1;
            }
            else if ((_ResidentPCBList[pid] != 1) && (_ResidentPCBList[pid] != 2) && (_ResidentPCBList[pid] != 3) && (_ResidentPCBList[pid] != 4)) {
                _StdOut.putText("Invalid Process ID specified in kill command...");
            }
            else {
                _TerminatedProcessList[pid] = 1;
                for (var i = 0; i < _ReadyQueue.getSize(); i++) {
                    var temp: TSOS.ProcessControlBlock = _ReadyQueue.q[i];
                    //console.log("PID 1: " + temp.PID + "   PID 2: " + pid);
                    //console.log(temp.PID == pid);
                    if (temp.PID == pid) {
                        //console.log(_ReadyQueue.q.length);
                        _ReadyQueue.q.splice(i, 1);
                        //console.log(_ReadyQueue.q.length);
                    }
                }
            }

        }

        //
        // System Calls... that generate software interrupts via tha Application Programming Interface library routines.
        //
        // Some ideas:
        // - ReadConsole
        // - WriteConsole
        // - CreateProcess
        // - ExitProcess
        // - WaitForProcessToExit
        // - CreateFile
        // - OpenFile
        // - ReadFile
        // - WriteFile
        // - CloseFile


        //
        // OS Utility Routines
        //
        public krnTrace(msg: string) {
             // Check globals to see if trace is set ON.  If so, then (maybe) log the message.
             if (_Trace) {
                if (msg === "Idle") {
                    // We can't log every idle clock pulse because it would lag the browser very quickly.
                    if (_OSclock % 10 == 0) {
                        // Check the CPU_CLOCK_INTERVAL in globals.ts for an
                        // idea of the tick rate and adjust this line accordingly.
                        Control.hostLog(msg, "OS");
                    }
                } else {
                    Control.hostLog(msg, "OS");
                }
             }
        }

        public krnTrapError(msg) {
            Control.hostLog("OS ERROR - TRAP: " + msg);
            _Console.displayBSOD(msg);
            this.krnShutdown();
        }



        public updateState() {
            this.memManager.updateMem();
            _Display.updateCPU();
            _Display.updateRQ();
            _Display.updateHDD();
        }

    }
}
