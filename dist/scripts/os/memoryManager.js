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
                // Add Memory Bound Check Above Block
            }
        };

        MemoryManager.prototype.clearMem = function () {
            _MemoryArray.clearMem();
        };

        MemoryManager.prototype.storeMem = function (relativeAddress, valueToStore) {
            if (relativeAddress >= 0 && relativeAddress <= 255) {
                _MemoryArray[relativeAddress + (_CurrentMemBlock * _MemBlockSize)] = valueToStore;
            } else {
                // Kernel Error
            }
        };

        MemoryManager.prototype.accessMem = function (relativeAddress) {
            if (relativeAddress >= 0 && relativeAddress <= 255) {
                return _MemoryArray.mem[relativeAddress + (_CurrentMemBlock * _MemBlockSize)];
            } else {
                // Kernel Error
            }
        };

        MemoryManager.prototype.accessFullMem = function (relativeAddress) {
            if (relativeAddress >= 0 && relativeAddress <= 767) {
                return _MemoryArray.mem[relativeAddress];
            } else {
                // Kernel Error
            }
        };

        MemoryManager.prototype.updateMem = function () {
            for (var z = 0; z <= 767; z++) {
                var dataCell = document.getElementById("td" + z);
                dataCell.innerHTML = _Kernel.memManager.accessFullMem(z);
            }
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
