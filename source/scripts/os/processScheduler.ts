module TSOS {

    export class ProcessScheduler {

        // Process Scheduling Algorithms:
        // 0: Round Robin

        public scheduleAlgorithm: number = 0;

        constructor() {

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

                _ReadyQueue.enqueue(_PCBArray[_CPU.currentPID]);
                var currPCB: TSOS.ProcessControlBlock = _ReadyQueue.dequeue();
                currPCB.quantumCycleCount = 0;
                _CPU.loadCPU(currPCB);

            }

        }

        public contextSwitchDrop() {

            if (!_ReadyQueue.isEmpty()) {

                var currPCB: TSOS.ProcessControlBlock = _ReadyQueue.dequeue();
                currPCB.quantumCycleCount = 0;
                _CPU.loadCPU(currPCB);

            }

            else
                _CPU.isExecuting = false;

        }

    }

}