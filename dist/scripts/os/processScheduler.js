var TSOS;
(function (TSOS) {
    var ProcessScheduler = (function () {
        function ProcessScheduler() {
            // Process Scheduling Algorithms:
            // 0: Round Robin
            this.scheduleAlgorithm = 0;
        }
        ProcessScheduler.prototype.contextSwitch = function () {
        };

        ProcessScheduler.prototype.contextSwitchDrop = function () {
            _CPU.loadCPU(_ReadyQueue.dequeue());
        };
        return ProcessScheduler;
    })();
    TSOS.ProcessScheduler = ProcessScheduler;
})(TSOS || (TSOS = {}));
