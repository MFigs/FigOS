var TSOS;
(function (TSOS) {
    var ProcessControlBlock = (function () {
        function ProcessControlBlock() {
            this.PID = _PIDAssign;
            _PIDAssign++;
            this.progCounter = 0;
            this.instructReg = "00";
            this.accum = 0;
            this.xReg = 0;
            this.yReg = 0;
            this.zFlag = 0;
            this.quantumCycleCount = 0;
            this.procStatus = "N/A";

            this.base = (_ResidentPCBList[this.PID] - 1) * _MemBlockSize;
            this.limit = (_ResidentPCBList[this.PID] * _MemBlockSize) - 1;

            if ((_ResidentPCBList[this.PID] === 1) || (_ResidentPCBList[this.PID] === 2) || (_ResidentPCBList[this.PID] === 3))
                this.loc = "Memory Block " + (_ResidentPCBList[this.PID] - 1);
            else
                this.loc = "Deleted from Memory";
        }
        ProcessControlBlock.prototype.updateStatus = function (newStatus) {
            this.procStatus = newStatus;
        };

        ProcessControlBlock.prototype.updateLoc = function () {
            if ((_ResidentPCBList[this.PID] === 1) || (_ResidentPCBList[this.PID] === 2) || (_ResidentPCBList[this.PID] === 3))
                this.loc = "Memory Block " + (_ResidentPCBList[this.PID] - 1);
            else
                this.loc = "Deleted from Memory";
        };
        return ProcessControlBlock;
    })();
    TSOS.ProcessControlBlock = ProcessControlBlock;
})(TSOS || (TSOS = {}));
