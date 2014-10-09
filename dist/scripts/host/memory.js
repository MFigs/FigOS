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

        Memory.prototype.loadMem = function (blockNumber, inputProgram) {
            var memLoc = blockNumber * _MemBlockSize;

            var len = inputProgram.length;
            var loadString = inputProgram;

            for (var j = 0; j < len / 2; j++) {
                var loadValue = loadString.substr(0, 2);
                loadString = loadString.substr(2);
                this.mem[memLoc] = loadValue;
                memLoc++;
            }
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
