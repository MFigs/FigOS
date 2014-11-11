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
var TSOS;
(function (TSOS) {
    var Cpu = (function () {
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, currentPID, isExecuting, base, limit) {
            if (typeof PC === "undefined") { PC = 0; }
            if (typeof Acc === "undefined") { Acc = 0; }
            if (typeof Xreg === "undefined") { Xreg = 0; }
            if (typeof Yreg === "undefined") { Yreg = 0; }
            if (typeof Zflag === "undefined") { Zflag = 0; }
            if (typeof currentPID === "undefined") { currentPID = 0; }
            if (typeof isExecuting === "undefined") { isExecuting = false; }
            if (typeof base === "undefined") { base = 0; }
            if (typeof limit === "undefined") { limit = 0; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.currentPID = currentPID;
            this.isExecuting = isExecuting;
            this.base = base;
            this.limit = limit;
        }
        Cpu.prototype.init = function () {
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
        };

        Cpu.prototype.loadCPU = function (pcb) {
            this.PC = pcb.progCounter;
            this.Acc = pcb.accum;
            this.Xreg = pcb.xReg;
            this.Yreg = pcb.yReg;
            this.Zflag = pcb.zFlag;
            this.currentPID = pcb.PID;
            this.base = pcb.base;
            this.limit = pcb.limit;
        };

        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');

            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            if (_SingleStepActive) {
                var nextProgramStep;
                nextProgramStep = new TSOS.ProgramCommand(_Kernel.memManager.accessMem(_CPU.PC));

                _PrevPC = _CPU.PC;

                if (_NextClicked) {
                    nextProgramStep.executeCommand();
                }

                this.isExecuting = false;
            } else {
                var nextProgramStep;
                nextProgramStep = new TSOS.ProgramCommand(_Kernel.memManager.accessMem(_CPU.PC));
                nextProgramStep.executeCommand();
            }

            _Kernel.updateState();

            _ProcessScheduler.handleScheduling();
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
