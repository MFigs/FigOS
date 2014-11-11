module TSOS {

    export class ProcessScheduler {

        // Process Scheduling Algorithms:
        // 0: Round Robin

        public scheduleAlgorithm: number;

        constructor() {

            this.scheduleAlgorithm = 0;

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

                _PCBArray[_CPU.currentPID].procStatus = "Ready";
                _ReadyQueue.enqueue(_PCBArray[_CPU.currentPID]);
                var currPCB: TSOS.ProcessControlBlock = _ReadyQueue.dequeue();
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
                var currPCB: TSOS.ProcessControlBlock = _ReadyQueue.dequeue();
                _CurrentMemBlock =_ResidentPCBList[currPCB.PID] - 1;
                currPCB.quantumCycleCount = 0;
                _CPU.loadCPU(currPCB);

                console.log("CONTEXT SWITCH: Process " + oldPCB.PID + " terminated; Process " + currPCB.PID + " loaded to CPU");

            }

            else {

                _PCBArray[_CPU.currentPID].procStatus = "Terminated";
                _CPU.isExecuting = false;

            }
        }

    }

}