module TSOS {

    export class Display {

        constructor() {

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

        }

        public updateRQ() {

        }
    }

}