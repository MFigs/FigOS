///<reference path="../globals.ts" />

/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public currentPID: number = 0,
                    public isExecuting: boolean = false,
                    public base: number = 0,
                    public limit: number = 0,
                    public hasProgram: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
            this.currentPID = 0;
            this.isExecuting = false;
            this.base = 0;
            this.limit = 0;
            this.hasProgram = false;
        }

        public loadCPU(pcb: ProcessControlBlock) {

            this.PC = pcb.progCounter;
            this.Acc = pcb.accum;
            this.Xreg = pcb.xReg;
            this.Yreg = pcb.yReg;
            this.Zflag = pcb.zFlag;
            this.currentPID = pcb.PID;
            this.base = pcb.base;
            this.limit = pcb.limit;

        }

        public cycle(): void {

            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.

            if (this.hasProgram = false) {

                _ReadyQueue.dequeue();
                this.hasProgram = true;

            }

            if (_SingleStepActive) {

                var nextProgramStep: TSOS.ProgramCommand;
                nextProgramStep = new TSOS.ProgramCommand(_Kernel.memManager.accessMem(_CPU.PC));

                _PrevPC = _CPU.PC;

                if (_NextClicked) {
                    nextProgramStep.executeCommand();
                }

                this.isExecuting = false;

            }

            else {

                var nextProgramStep: TSOS.ProgramCommand;
                nextProgramStep = new TSOS.ProgramCommand(_Kernel.memManager.accessMem(_CPU.PC));
                nextProgramStep.executeCommand();

            }

            _Kernel.updateState();

            _ProcessScheduler.handleScheduling();

        }

    }
}
