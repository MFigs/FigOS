

module TSOS {

    export class Memory {

        public mem: string[];

        constructor() {

            this.mem = [];
            this.clearMem();

        }

        public clearMem() {

            for(var i = 0; i < _MemSize; i++) {
                this.mem[i] = "00";
            }

        }

        public displayMemory() {

            var mDiv = document.getElementById("divMemTableArea");
            var mTable = document.createElement("memTable");
            var mTBody = document.createElement("memTableBody");

            var groupCount: number = 0;

            var dataArray: Node[] = [];

            for (var x = 0; x <= 767; x++) {

                var td = document.createElement('td');
                td.setAttribute('id', "td" + x);
                var data = document.createTextNode(this.mem[x]);
                td.appendChild(data);
                dataArray[x] = td;

            }

            var accessor = 0;

            var rowLabelPrefix: string = "0x";
            var memNumber: number = 0;

            for (var y = 0; y <= 95; y++) {

                var tr = document.createElement('tr');
                tr.setAttribute('id', "tr" + y);
                var memLabel: string = memNumber.toString(16);
                for (var i = memLabel.length; i < 3; i++)
                    memLabel = "0" + memLabel;
                memLabel = memLabel.toUpperCase();
                var rowHead = document.createTextNode(rowLabelPrefix + memLabel);
                var rH = document.createElement('td');
                rH.setAttribute('id', "rH" + memNumber);
                memNumber += 8;
                rH.appendChild(rowHead);

                tr.appendChild(rH);

                while (groupCount < 8) {
                    tr.appendChild(dataArray[accessor]);
                    groupCount++;
                    accessor++;
                }
                groupCount = 0;
                mTBody.appendChild(tr);
            }

            mTable.appendChild(mTBody);
            mDiv.appendChild(mTable);
        }

        public translateToHexString(inputNum: number) {
            var outputHexString: string = "";
            var lowOrderDigit: number = inputNum % 16;
            var highOrderDigit: number = (inputNum - lowOrderDigit)/16;

            switch(highOrderDigit) {
                case 0: {outputHexString = "0"; break;}
                case 1: {outputHexString = "1"; break;}
                case 2: {outputHexString = "2"; break;}
                case 3: {outputHexString = "3"; break;}
                case 4: {outputHexString = "4"; break;}
                case 5: {outputHexString = "5"; break;}
                case 6: {outputHexString = "6"; break;}
                case 7: {outputHexString = "7"; break;}
                case 8: {outputHexString = "8"; break;}
                case 9: {outputHexString = "9"; break;}
                case 10: {outputHexString = "A"; break;}
                case 11: {outputHexString = "B"; break;}
                case 12: {outputHexString = "C"; break;}
                case 13: {outputHexString = "D"; break;}
                case 14: {outputHexString = "E"; break;}
                case 15: {outputHexString = "F"; break;}
            }

            switch(lowOrderDigit) {
                case 0: {outputHexString = outputHexString + "0"; break;}
                case 1: {outputHexString = outputHexString + "1"; break;}
                case 2: {outputHexString = outputHexString + "2"; break;}
                case 3: {outputHexString = outputHexString + "3"; break;}
                case 4: {outputHexString = outputHexString + "4"; break;}
                case 5: {outputHexString = outputHexString + "5"; break;}
                case 6: {outputHexString = outputHexString + "6"; break;}
                case 7: {outputHexString = outputHexString + "7"; break;}
                case 8: {outputHexString = outputHexString + "8"; break;}
                case 9: {outputHexString = outputHexString + "9"; break;}
                case 10: {outputHexString = outputHexString + "A"; break;}
                case 11: {outputHexString = outputHexString + "B"; break;}
                case 12: {outputHexString = outputHexString + "C"; break;}
                case 13: {outputHexString = outputHexString + "D"; break;}
                case 14: {outputHexString = outputHexString + "E"; break;}
                case 15: {outputHexString = outputHexString + "F"; break;}
            }

            return outputHexString;

        }

    }

}