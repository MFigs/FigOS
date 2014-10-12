

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

    }

}