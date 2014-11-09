var TSOS;
(function (TSOS) {
    var ProcessScheduler = (function () {
        function ProcessScheduler() {
            // Process Scheduling Algorithms:
            // 0: Round Robin
            this.scheduleAlgorithm = 0;
        }
        ProcessScheduler.prototype.handleScheduling = function () {
            if (_ProcessScheduler.scheduleAlgorithm === 0) {
                _PCBArray[_CPU.currentPID].quantumCycleCount += 1;

                if (_PCBArray[_CPU.currentPID].quantumCycleCount === _Quantum) {
                    if (!_ReadyQueue.isEmpty())
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(TIMER_IRQ, null));
                    else
                        _PCBArray[_CPU.currentPID].quantumCycleCount = 0;
                }
            }
        };

        ProcessScheduler.prototype.contextSwitch = function () {
            if (!_ReadyQueue.isEmpty()) {
                _ReadyQueue.enqueue(_PCBArray[_CPU.currentPID]);
                var currPCB = _ReadyQueue.dequeue();
                currPCB.quantumCycleCount = 0;
                _CPU.loadCPU(currPCB);
            }
        };

        ProcessScheduler.prototype.contextSwitchDrop = function () {
            if (!_ReadyQueue.isEmpty()) {
                var currPCB = _ReadyQueue.dequeue();
                currPCB.quantumCycleCount = 0;
                _CPU.loadCPU(currPCB);
            } else
                _CPU.isExecuting = false;
        };
        return ProcessScheduler;
    })();
    TSOS.ProcessScheduler = ProcessScheduler;
})(TSOS || (TSOS = {}));
