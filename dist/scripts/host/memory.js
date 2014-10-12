var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory() {
            this.mem = new Array();
            this.mem.clearMem();
        }
        Memory.prototype.clearMem = function () {
            for (var i = 0; i < _MemSize; i++) {
                this.mem[i] = "00";
            }
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
