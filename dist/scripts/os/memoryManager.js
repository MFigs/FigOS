var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        MemoryManager.prototype.loadMem = function (blockNumber, inputProgram) {
            //this.clearMem();
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

        MemoryManager.prototype.clearMemBlock = function (blockNumber) {
            var base = blockNumber * _MemBlockSize;
            var lim = base + _MemBlockSize - 1;

            for (var r = base; r <= lim; r++) {
                _MemoryArray.mem[r] = '00';
            }

            _MemLoadedTable[blockNumber] = 0;
        };

        MemoryManager.prototype.loadMemBlock = function (blockNumber) {
            var base = blockNumber * _MemBlockSize;
            var lim = base + _MemBlockSize - 1;
            var output = "";

            for (var s = base; s <= lim; s++) {
                output = output + _MemoryArray.mem[s];
            }

            _MemLoadedTable[blockNumber] = 1;

            return output;
        };

        MemoryManager.prototype.clearMem = function () {
            _MemoryArray.clearMem();
            for (var i = 0; i < 3; i++)
                _MemLoadedTable[i] = 0;
            for (var j = 0; j < _ResidentPCBList.length; j++) {
                if (_ResidentPCBList[j] !== 4)
                    _ResidentPCBList[j] = 0;
            }
        };

        MemoryManager.prototype.storeMem = function (relativeAddress, valueToStore) {
            if (relativeAddress >= 0 && relativeAddress <= 255) {
                _MemoryArray.mem[relativeAddress + (_CurrentMemBlock * _MemBlockSize)] = valueToStore;
            } else {
                _StdOut.putText("Error: Invalid Memory Store... Index Out of Bounds... Terminating Process...");
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(TIMER_KILL_ACTIVE_IRQ, null));
            }
        };

        MemoryManager.prototype.accessMem = function (relativeAddress) {
            if (relativeAddress >= 0 && relativeAddress <= 255) {
                return _MemoryArray.mem[relativeAddress + (_CurrentMemBlock * _MemBlockSize)];
            } else {
                _StdOut.putText("Error: Invalid Memory Access... Index Out of Bounds... Terminating Process...");
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(TIMER_KILL_ACTIVE_IRQ, null));
            }
        };

        MemoryManager.prototype.accessFullMem = function (address) {
            if (address >= 0 && address <= 767) {
                return _MemoryArray.mem[address];
            } else {
                _StdOut.putText("Error: Invalid Memory Access... Index Out of Bounds... Terminating Process...");
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(TIMER_KILL_ACTIVE_IRQ, null));
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
