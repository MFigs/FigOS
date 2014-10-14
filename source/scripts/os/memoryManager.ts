
module TSOS {

    export class MemoryManager {

        constructor(){}

        public loadMem(blockNumber: number, inputProgram: string): void {

            var memLoc = blockNumber * _MemBlockSize;

            var len = inputProgram.length;
            var loadString = inputProgram;

            for (var j = 0; j < len/2; j++) {

                var loadValue = loadString.substr(0, 2);
                loadString = loadString.substr(2);

                _MemoryArray.mem[memLoc] = loadValue;
                memLoc++;

                // Add Memory Bound Check Above Block

            }

        }

        public clearMem(): void {
            _MemoryArray.clearMem();
        }

        public storeMem(relativeAddress: number, valueToStore: string): void {

            if (relativeAddress >= 0 && relativeAddress <= 255) {

                _MemoryArray[relativeAddress + (_CurrentMemBlock * _MemBlockSize)] = valueToStore;

            }

            else {

                // Kernel Error

            }

        }

        public accessMem(relativeAddress: number): string {

            if (relativeAddress >= 0 && relativeAddress <= 255) {

                return _MemoryArray[relativeAddress + (_CurrentMemBlock * _MemBlockSize)];

            }

            else {

                // Kernel Error

            }

        }

        /*public displayMemory() {

            var mDiv = document.getElementById("divMemory");
            var mTable = document.createElement("memTable");
            var mTBody = document.createElement("memTableBody");

            var groupCount: number = 0;

            var dataArray: Node[] = [];

            for (var x = 0; x <= 767; x++) {

                var td = document.createElement("td" + x);
                var data = document.createTextNode(_Kernel.memManager.accessMem(x));
                td.appendChild(data);
                dataArray[x] = td;

            }

            var accessor = 0;

            for (var y = 0; y <= 95; y++) {

                var tr = document.createElement("tr" + y);

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

        }*/

    }
}
