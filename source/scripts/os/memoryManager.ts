
module TSOS {

    export class MemoryManager {

        constructor(){}

        public loadMem(blockNumber: number, inputProgram: string): void {

            var memLoc = blockNumber * _MemBlockSize;

            var len = inputProgram.length;
            var loadString = inputProgram;

            for (var j = 0; j < len/2; j++) {

                var loadValue = loadString.substr(0, 2);
                loadString = loadString.substr(2);
                _MemoryArray.mem[memLoc] = loadValue;
                memLoc++;

                // Add Memory Bound Check Above Block

            }

        }

        public clearMem(): void {
            _MemoryArray.clearMem();
        }

        public storeMem(relativeAddress: number, valueToStore: string): void {

            if (relativeAddress >= 0 && relativeAddress <= 255) {

                _MemoryArray[relativeAddress + (_CurrentMemBlock * _MemBlockSize)] = valueToStore;

            }

            else {

                // Kernel Error

            }

        }

        public accessMem(relativeAddress: number): string {

            if (relativeAddress >= 0 && relativeAddress <= 255) {

                return _MemoryArray[relativeAddress + (_CurrentMemBlock * _MemBlockSize)];

            }

            else {

                // Kernel Error

            }

        }

    }
}
