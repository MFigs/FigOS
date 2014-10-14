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
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
            this.currentPID = 0;
        }

        public loadCPU(pcb: ProcessControlBlock) {

            this.PC = pcb.progCounter;
            this.Acc = pcb.accum;
            this.Xreg = pcb.xReg;
            this.Yreg = pcb.yReg;
            this.Zflag = pcb.zFlag;
            this.currentPID = pcb.PID;

        }

        public displayCPU() {

            var cDiv = document.getElementById("divCPUTable");
            var cTable = document.createElement("cpuTable");
            var cTBody = document.createElement("cpuTableBody");

            var trLabel = document.createElement("cpuLabelRow");

            var label0 = document.createTextNode("PC");
            var tdl0 = document.createElement('td');
            tdl0.setAttribute("id", "tdl0");
            tdl0.appendChild(label0);

            var label1 = document.createTextNode("IR");
            var tdl1 = document.createElement('td');
            tdl1.setAttribute("id", "tdl1");
            tdl1.appendChild(label1);

            var label2 = document.createTextNode("AC");
            var tdl2 = document.createElement('td');
            tdl2.setAttribute("id", "tdl2");
            tdl2.appendChild(label2);

            var label3 = document.createTextNode("XR");
            var tdl3 = document.createElement('td');
            tdl3.setAttribute("id", "tdl3");
            tdl3.appendChild(label3);

            var label4 = document.createTextNode("YR");
            var tdl4 = document.createElement('td');
            tdl4.setAttribute("id", "tdl4");
            tdl4.appendChild(label4);

            var label5 = document.createTextNode("ZF");
            var tdl5 = document.createElement('td');
            tdl5.setAttribute("id", "tdl5");
            tdl5.appendChild(label5);

            trLabel.appendChild(tdl0);
            trLabel.appendChild(tdl1);
            trLabel.appendChild(tdl2);
            trLabel.appendChild(tdl3);
            trLabel.appendChild(tdl4);
            trLabel.appendChild(tdl5);

            var trData = document.createElement("cpuDataRow");

            var data0 = document.createTextNode((_CPU.PC).toString());
            var tdc0 = document.createElement('td');
            tdc0.setAttribute("id", "tdc0");
            tdc0.appendChild(data0);

            var data1 = document.createTextNode("" + (_MemoryArray.mem[_CPU.PC]));
            var tdc1 = document.createElement('td');
            tdc1.setAttribute("id", "tdc1");
            tdc1.appendChild(data1);

            var data2 = document.createTextNode((_CPU.Acc).toString());
            var tdc2 = document.createElement('td');
            tdc2.setAttribute("id", "tdc2");
            tdc2.appendChild(data2);

            var data3 = document.createTextNode((_CPU.Xreg).toString());
            var tdc3 = document.createElement('td');
            tdc3.setAttribute("id", "tdc3");
            tdc3.appendChild(data3);

            var data4 = document.createTextNode((_CPU.Yreg).toString());
            var tdc4 = document.createElement('td');
            tdc4.setAttribute("id", "tdc4");
            tdc4.appendChild(data4);

            var data5 = document.createTextNode((_CPU.Zflag).toString());
            var tdc5 = document.createElement('td');
            tdc5.setAttribute("id", "tdc5");
            tdc5.appendChild(data5);

            trData.appendChild(tdc0);
            trData.appendChild(tdc1);
            trData.appendChild(tdc2);
            trData.appendChild(tdc3);
            trData.appendChild(tdc4);
            trData.appendChild(tdc5);

            cTBody.appendChild(trLabel);
            cTBody.appendChild(trData);

            cTable.appendChild(cTBody);

            cDiv.appendChild(cTable);

        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.

            if (_SingleStepActive) {

                var nextProgramStep: TSOS.ProgramCommand;
                nextProgramStep = new TSOS.ProgramCommand(_Kernel.memManager.accessMem(_CPU.PC));
                nextProgramStep.executeCommand();

                this.isExecuting = false;
            }

            else {

                var nextProgramStep: TSOS.ProgramCommand;
                nextProgramStep = new TSOS.ProgramCommand(_Kernel.memManager.accessMem(_CPU.PC));
                nextProgramStep.executeCommand();

            }

            if (_IsProgramComplete == true) {

                _ResidentPCBList[this.currentPID] = 0;
                _IsProgramComplete = false;

            }

            _Kernel.updateState();

        }

    }
}
