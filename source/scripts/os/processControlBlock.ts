

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
        public procStatus: string;
        public loc: string;

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
            this.procStatus = "N/A";

            if ((_ResidentPCBList[this.PID] === 1) || (_ResidentPCBList[this.PID] === 2) || (_ResidentPCBList[this.PID] === 3))
                this.loc = "Memory Block " + (_ResidentPCBList[this.PID] - 1);
            else
                this.loc = "Deleted from Memory";

        }

        public updateStatus(newStatus: string) {

            this.procStatus = newStatus;

        }

        public updateLoc() {

            if ((_ResidentPCBList[this.PID] === 1) || (_ResidentPCBList[this.PID] === 2) || (_ResidentPCBList[this.PID] === 3))
                this.loc = "Memory Block " + (_ResidentPCBList[this.PID] - 1);
            else
                this.loc = "Deleted from Memory";

        }

    }

}