
module TSOS {

    export class MemoryManager {

        constructor(){}

        public loadMem(blockNumber: number, inputProgram: string) {

            var memLoc = blockNumber * _MemBlockSize;

            var len = inputProgram.length;
            var loadString = inputProgram;

            for (var j = 0; j < len/2; j++) {

                var loadValue = loadString.substr(0, 2);
                loadString = loadString.substr(2);
                _MemoryArray.mem[memLoc] = loadValue;
                memLoc++;

            }

        }

        public clearMem() {
            _MemoryArray.clearMem();
        }

    }
}
