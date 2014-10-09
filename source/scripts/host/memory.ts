

module TSOS {

    export class Memory {

        public mem;

        constructor() {

            this.mem = new Array();
            this.mem.clearMem();

        }

        public clearMem() {

            for(var i = 0; i < _MemSize; i++) {
                this.mem[i] = "00";
            }

        }

        public loadMem(blockNumber: number, inputProgram: string) {

            var memLoc = blockNumber * _MemBlockSize;

            var len = inputProgram.length;
            var loadString = inputProgram;

            for (var j = 0; j < len/2; j++) {

                var loadValue = loadString.substr(0, 2);
                loadString = loadString.substr(2);
                this.mem[memLoc] = loadValue;
                memLoc++;

            }

        }

    }

}