module TSOS {

    export class Display {

        constructor() {

            this.displayCPU();
            this.displayRQ();

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

        public updateCPU() {

            var dataCell0 = document.getElementById("tdc0");
            dataCell0.innerHTML = "" + _CPU.PC;

            var dataCell1 = document.getElementById("tdc1");
            dataCell1.innerHTML = _Kernel.memManager.accessMem(_PrevPC);

            var dataCell2 = document.getElementById("tdc2");
            dataCell2.innerHTML = "" + _CPU.Acc;

            var dataCell3 = document.getElementById("tdc3");
            dataCell3.innerHTML = "" + _CPU.Xreg;

            var dataCell4 = document.getElementById("tdc4");
            dataCell4.innerHTML = "" + _CPU.Yreg;

            var dataCell5 = document.getElementById("tdc5");
            dataCell5.innerHTML = "" + _CPU.Zflag;

        }

        public displayRQ() {

            var rTable = document.getElementById("rqTable");
            var rTBody = document.createElement('TBODY');
            rTBody.setAttribute('id', "rtb");


            for (var i: number = 0; i < _ReadyQueue.q.length; i++) {

                var pcb: TSOS.ProcessControlBlock = _ReadyQueue.q[i];
                var pid = pcb.PID;

                var trDatar = document.createElement('tr');
                trDatar.setAttribute('id', "trDatar" + pid);

                var datar0 = document.createTextNode((pcb.PID).toString());
                var tdr0 = document.createElement('td');
                tdr0.setAttribute("id", "tdr0" + pid);
                tdr0.appendChild(datar0);

                var datar1 = document.createTextNode((_PCBArray[pid].progCounter).toString());
                var tdr1 = document.createElement('td');
                tdr1.setAttribute("id", "tdr1" + pid);
                tdr1.appendChild(datar1);

                var datar2 = document.createTextNode("" + (_MemoryArray.mem[_PCBArray[pid].progCounter]));
                var tdr2 = document.createElement('td');
                tdr2.setAttribute("id", "tdr2" + pid);
                tdr2.appendChild(datar2);

                var datar3 = document.createTextNode((_PCBArray[pid].accum).toString());
                var tdr3 = document.createElement('td');
                tdr3.setAttribute("id", "tdr3" + pid);
                tdr3.appendChild(datar3);

                var datar4 = document.createTextNode((_PCBArray[pid].xReg).toString());
                var tdr4 = document.createElement('td');
                tdr4.setAttribute("id", "tdr4" + pid);
                tdr4.appendChild(datar4);

                var datar5 = document.createTextNode((_PCBArray[pid].yReg).toString());
                var tdr5 = document.createElement('td');
                tdr5.setAttribute("id", "tdr5" + pid);
                tdr5.appendChild(datar5);

                var datar6 = document.createTextNode((_PCBArray[pid].zFlag).toString());
                var tdr6 = document.createElement('td');
                tdr6.setAttribute("id", "tdr6" + pid);
                tdr6.appendChild(datar6);

                var datar7 = document.createTextNode((_PCBArray[pid].procStatus));
                var tdr7 = document.createElement('td');
                tdr7.setAttribute("id", "tdr7" + pid);
                tdr7.appendChild(datar7);

                var datar8 = document.createTextNode(_PCBArray[pid].loc);
                var tdr8 = document.createElement('td');
                tdr8.setAttribute("id", "tdr8" + pid);
                tdr8.appendChild(datar8);


                trDatar.appendChild(tdr0);
                trDatar.appendChild(tdr1);
                trDatar.appendChild(tdr2);
                trDatar.appendChild(tdr3);
                trDatar.appendChild(tdr4);
                trDatar.appendChild(tdr5);
                trDatar.appendChild(tdr6);
                trDatar.appendChild(tdr7);
                trDatar.appendChild(tdr8);

            }

            rTable.appendChild(rTBody);

        }

        public updateRQ() {

            var rtbody = document.getElementById("rtb");
            rtbody.parentNode.removeChild(rtbody);

            var rTable = document.getElementById("rqTable");
            var rTBody = document.createElement('TBODY');
            rTBody.setAttribute('id', "rtb");


            for (var i: number = 0; i < _ReadyQueue.q.length; i++) {

                var pcb: TSOS.ProcessControlBlock = _ReadyQueue.q[i];
                var pid = pcb.PID;

                var trDatar = document.createElement('tr');
                trDatar.setAttribute('id', "trDatar" + pid);

                var datar0 = document.createTextNode((pcb.PID).toString());
                var tdr0 = document.createElement('td');
                tdr0.setAttribute("id", "tdr0" + pid);
                tdr0.appendChild(datar0);

                var datar1 = document.createTextNode((_PCBArray[pid].progCounter).toString());
                var tdr1 = document.createElement('td');
                tdr1.setAttribute("id", "tdr1" + pid);
                tdr1.appendChild(datar1);

                var datar2 = document.createTextNode("" + (_MemoryArray.mem[_PCBArray[pid].progCounter]));
                var tdr2 = document.createElement('td');
                tdr2.setAttribute("id", "tdr2" + pid);
                tdr2.appendChild(datar2);

                var datar3 = document.createTextNode((_PCBArray[pid].accum).toString());
                var tdr3 = document.createElement('td');
                tdr3.setAttribute("id", "tdr3" + pid);
                tdr3.appendChild(datar3);

                var datar4 = document.createTextNode((_PCBArray[pid].xReg).toString());
                var tdr4 = document.createElement('td');
                tdr4.setAttribute("id", "tdr4" + pid);
                tdr4.appendChild(datar4);

                var datar5 = document.createTextNode((_PCBArray[pid].yReg).toString());
                var tdr5 = document.createElement('td');
                tdr5.setAttribute("id", "tdr5" + pid);
                tdr5.appendChild(datar5);

                var datar6 = document.createTextNode((_PCBArray[pid].zFlag).toString());
                var tdr6 = document.createElement('td');
                tdr6.setAttribute("id", "tdr6" + pid);
                tdr6.appendChild(datar6);

                var datar7 = document.createTextNode((_PCBArray[pid].procStatus));
                var tdr7 = document.createElement('td');
                tdr7.setAttribute("id", "tdr7" + pid);
                tdr7.appendChild(datar7);

                var datar8 = document.createTextNode(_PCBArray[pid].loc);
                var tdr8 = document.createElement('td');
                tdr8.setAttribute("id", "tdr8" + pid);
                tdr8.appendChild(datar8);


                trDatar.appendChild(tdr0);
                trDatar.appendChild(tdr1);
                trDatar.appendChild(tdr2);
                trDatar.appendChild(tdr3);
                trDatar.appendChild(tdr4);
                trDatar.appendChild(tdr5);
                trDatar.appendChild(tdr6);
                trDatar.appendChild(tdr7);
                trDatar.appendChild(tdr8);

                rTBody.appendChild(trDatar);

            }

            rTable.appendChild(rTBody);

        }

        public displayHDD() {

        }

        public updateHDD() {

        }
    }

}