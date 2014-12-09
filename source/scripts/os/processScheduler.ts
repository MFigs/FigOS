module TSOS {

    export class ProcessScheduler {

        // Process Scheduling Algorithms:
        // 0: Round Robin
        // 1: First Come, First Served
        // 2: Priority

        public scheduleAlgorithm: number;
        public programCount: number;

        constructor() {

            this.scheduleAlgorithm = 0;
            this.programCount = 0;

        }

        public handleScheduling() {

            if (_ProcessScheduler.scheduleAlgorithm === 0) {

                _PCBArray[_CPU.currentPID].quantumCycleCount += 1;

                if (_PCBArray[_CPU.currentPID].quantumCycleCount === _Quantum) {

                    if (!_ReadyQueue.isEmpty())
                        _KernelInterruptQueue.enqueue(new Interrupt(TIMER_IRQ, null));
                    else
                        _PCBArray[_CPU.currentPID].quantumCycleCount = 0;
                }

            }

        }

        public contextSwitch() {

            if (!_ReadyQueue.isEmpty()) {

                var oldPCB: TSOS.ProcessControlBlock = _PCBArray[_CPU.currentPID];
                var currMemBlock = _CurrentMemBlock;

                var currPCB: TSOS.ProcessControlBlock = _ReadyQueue.dequeue();

                if (currPCB.swapFileName !== "") {

                    _krnHDDDriver.readFile(currPCB.swapFileName, "krn");
                    var stringToDisk: string = _Kernel.memManager.loadMemBlock(currMemBlock);
                    _Kernel.memManager.clearMemBlock(currMemBlock);
                    _Kernel.memManager.loadMem(currMemBlock, _TempSwapFileData);
                    currPCB.updateLoc();
                    oldPCB.swapFileName = currPCB.swapFileName;
                    oldPCB.updateLoc();
                    currPCB.swapFileName = "";

                    _ResidentPCBList[_CPU.currentPID] = 4;
                    _ResidentPCBList[currPCB.PID] = currMemBlock + 1;

                    _krnHDDDriver.writeFile(oldPCB.swapFileName, stringToDisk, "krn");

                    console.log("PROC " + oldPCB.PID + " MOVED TO DISK; PROC " + currPCB.PID + " MOVED TO MEM BLOCK " + currMemBlock);


                }

                _PCBArray[_CPU.currentPID].procStatus = "Ready";
                _ReadyQueue.enqueue(_PCBArray[_CPU.currentPID]);

                _CurrentMemBlock =_ResidentPCBList[currPCB.PID] - 1;
                currPCB.quantumCycleCount = 0;
                currPCB.procStatus = "Running";
                _CPU.loadCPU(currPCB);

                console.log("CONTEXT SWITCH: Process " + oldPCB.PID + " added to ready queue; Process " + currPCB.PID + " loaded to CPU");

            }

            else {

                _PCBArray[_CPU.currentPID].quantumCycleCount = 0;

            }

        }

        public contextSwitchDrop() {

            if (!_ReadyQueue.isEmpty()) {

                var oldPCB: TSOS.ProcessControlBlock = _PCBArray[_CPU.currentPID];

                _PCBArray[_CPU.currentPID].procStatus = "Terminated";
                _ProcessScheduler.programCount -= 1;
                var currPCB: TSOS.ProcessControlBlock = _ReadyQueue.dequeue();

                if (currPCB.swapFileName !== "") {

                    var currMemBlock: number = _CurrentMemBlock;
                    _krnHDDDriver.readFile(currPCB.swapFileName, "krn");
                    _Kernel.memManager.clearMemBlock(currMemBlock);
                    _Kernel.memManager.loadMem(currMemBlock, _TempSwapFileData);
                    currPCB.updateLoc();
                    currPCB.swapFileName = "";

                    _ResidentPCBList[currPCB.PID] = currMemBlock + 1;


                    console.log("PROC " + currPCB.PID + " MOVED TO MEM BLOCK " + currMemBlock);

                }



                _CurrentMemBlock =_ResidentPCBList[currPCB.PID] - 1;
                currPCB.quantumCycleCount = 0;
                _CPU.loadCPU(currPCB);

                console.log("CONTEXT SWITCH: Process " + oldPCB.PID + " terminated; Process " + currPCB.PID + " loaded to CPU");

            }

            else {

                _PCBArray[_CPU.currentPID].procStatus = "Terminated";
                _CPU.isExecuting = false;
                for(var i = 0; i < 3; i++) {
                    _MemLoadedTable[i] = 0;
                }
                for (var j = 1; j < _SwapFileCounter; j++) {

                    _krnHDDDriver.deleteFile(".swap" + j, "krn");

                }

            }
        }

    }

}