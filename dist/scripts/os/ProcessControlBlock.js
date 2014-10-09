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
        }
        return ProcessControlBlock;
    })();
    TSOS.ProcessControlBlock = ProcessControlBlock;
})(TSOS || (TSOS = {}));
