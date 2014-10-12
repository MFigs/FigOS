var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        MemoryManager.prototype.loadMem = function (blockNumber, inputProgram) {
            var memLoc = blockNumber * _MemBlockSize;

            var len = inputProgram.length;
            var loadString = inputProgram;

            for (var j = 0; j < len / 2; j++) {
                var loadValue = loadString.substr(0, 2);
                loadString = loadString.substr(2);
                _MemoryArray.mem[memLoc] = loadValue;
                memLoc++;
            }
        };

        MemoryManager.prototype.clearMem = function () {
            _MemoryArray.clearMem();
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
