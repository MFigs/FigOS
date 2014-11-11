var TSOS;
(function (TSOS) {
    var Display = (function () {
        function Display() {
            this.displayCPU();
            this.displayRQ();
        }
        Display.prototype.displayCPU = function () {
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
        };

        Display.prototype.updateCPU = function () {
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
        };

        Display.prototype.displayRQ = function () {
            var rqHTML = document.getElementById("divRQTable");
            rqHTML.innerHTML = "";

            var rDiv = document.getElementById("divRQTable");
            var rTable = document.createElement("rqTable");
            var rTBody = document.createElement("rqTableBody");

            var trLabelr = document.createElement("rqLabelRow");

            var label0r = document.createTextNode("PID");
            var tdl0r = document.createElement('td');
            tdl0r.setAttribute("id", "tdl0r");
            tdl0r.appendChild(label0r);

            var label1r = document.createTextNode("PC");
            var tdl1r = document.createElement('td');
            tdl1r.setAttribute("id", "tdl1r");
            tdl1r.appendChild(label1r);

            var label2r = document.createTextNode("IR");
            var tdl2r = document.createElement('td');
            tdl2r.setAttribute("id", "tdl2r");
            tdl2r.appendChild(label2r);

            var label3r = document.createTextNode("AC");
            var tdl3r = document.createElement('td');
            tdl3r.setAttribute("id", "tdl3r");
            tdl3r.appendChild(label3r);

            var label4r = document.createTextNode("XR");
            var tdl4r = document.createElement('td');
            tdl4r.setAttribute("id", "tdl4r");
            tdl4r.appendChild(label4r);

            var label5r = document.createTextNode("YR");
            var tdl5r = document.createElement('td');
            tdl5r.setAttribute("id", "tdl5r");
            tdl5r.appendChild(label5r);

            var label6r = document.createTextNode("ZF");
            var tdl6r = document.createElement('td');
            tdl6r.setAttribute("id", "tdl6r");
            tdl6r.appendChild(label6r);

            var label7r = document.createTextNode("Status");
            var tdl7r = document.createElement('td');
            tdl7r.setAttribute("id", "tdl7r");
            tdl7r.appendChild(label7r);

            var label8r = document.createTextNode("Location");
            var tdl8r = document.createElement('td');
            tdl8r.setAttribute("id", "tdl8r");
            tdl8r.appendChild(label8r);

            trLabelr.appendChild(tdl0r);
            trLabelr.appendChild(tdl1r);
            trLabelr.appendChild(tdl2r);
            trLabelr.appendChild(tdl3r);
            trLabelr.appendChild(tdl4r);
            trLabelr.appendChild(tdl5r);
            trLabelr.appendChild(tdl6r);
            trLabelr.appendChild(tdl7r);
            trLabelr.appendChild(tdl8r);

            for (var i = 0; i < _ReadyQueue.q.length; i++) {
                // Add more rows here for more processes
                var trDatar = document.createElement("rqDataRow");
                trDatar.setAttribute('id', "trDatar" + i);

                var datar0 = document.createTextNode((_PCBArray[i].PID).toString());
                var tdr0 = document.createElement('td');
                tdr0.setAttribute("id", "tdr0" + i);
                tdr0.appendChild(datar0);

                var datar1 = document.createTextNode((_PCBArray[i].progCounter).toString());
                var tdr1 = document.createElement('td');
                tdr1.setAttribute("id", "tdr1" + i);
                tdr1.appendChild(datar1);

                var datar2 = document.createTextNode("" + (_MemoryArray.mem[_PCBArray[i].progCounter]));
                var tdr2 = document.createElement('td');
                tdr2.setAttribute("id", "tdr2" + i);
                tdr2.appendChild(datar2);

                var datar3 = document.createTextNode((_PCBArray[i].accum).toString());
                var tdr3 = document.createElement('td');
                tdr3.setAttribute("id", "tdr3" + i);
                tdr3.appendChild(datar3);

                var datar4 = document.createTextNode((_PCBArray[i].xReg).toString());
                var tdr4 = document.createElement('td');
                tdr4.setAttribute("id", "tdr4" + i);
                tdr4.appendChild(datar4);

                var datar5 = document.createTextNode((_PCBArray[i].yReg).toString());
                var tdr5 = document.createElement('td');
                tdr5.setAttribute("id", "tdr5" + i);
                tdr5.appendChild(datar5);

                var datar6 = document.createTextNode((_PCBArray[i].zFlag).toString());
                var tdr6 = document.createElement('td');
                tdr6.setAttribute("id", "tdr6" + i);
                tdr6.appendChild(datar6);

                var datar7 = document.createTextNode((_PCBArray[i].procStatus));
                var tdr7 = document.createElement('td');
                tdr7.setAttribute("id", "tdr7" + i);
                tdr7.appendChild(datar7);

                var datar8 = document.createTextNode(_PCBArray[i].loc);
                var tdr8 = document.createElement('td');
                tdr8.setAttribute("id", "tdr8" + i);
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

            rTBody.appendChild(trLabelr);

            for (var i = 0; i < _ReadyQueue.q.length; i++) {
                var dataRow = document.getElementById("trDatar" + i);
                rTBody.appendChild(dataRow);
            }

            rTable.appendChild(rTBody);

            rDiv.appendChild(rTable);
        };

        Display.prototype.updateRQ = function () {
        };
        return Display;
    })();
    TSOS.Display = Display;
})(TSOS || (TSOS = {}));
