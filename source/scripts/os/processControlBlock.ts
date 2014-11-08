

module TSOS {

    export class ProcessControlBlock {

        public PID: number;

        public progCounter: number;
        public instructReg: string;
        public accum: number;
        public xReg: number;
        public yReg: number;
        public zFlag: number;
        public quantumCycleCount: number;

        constructor() {

            this.PID = _PIDAssign;
            _PIDAssign++;
            this.progCounter = 0;
            this.instructReg = "00";
            this.accum = 0;
            this.xReg = 0;
            this.yReg = 0;
            this.zFlag = 0;
            this.quantumCycleCount = 0;

        }

    }

}