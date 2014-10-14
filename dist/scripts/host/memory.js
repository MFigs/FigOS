var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory() {
            this.mem = [];
            this.clearMem();
        }
        Memory.prototype.clearMem = function () {
            for (var i = 0; i < _MemSize; i++) {
                this.mem[i] = "00";
            }
        };

        Memory.prototype.displayMemory = function () {
            var mDiv = document.getElementById("divMemTableArea");
            var mTable = document.createElement("memTable");
            var mTBody = document.createElement("memTableBody");

            var groupCount = 0;

            var dataArray = [];

            for (var x = 0; x <= 767; x++) {
                var td = document.createElement('td');
                td.setAttribute('id', "td" + x);
                var data = document.createTextNode(this.mem[x]);
                td.appendChild(data);
                dataArray[x] = td;
            }

            var accessor = 0;

            for (var y = 0; y <= 95; y++) {
                var tr = document.createElement('tr');
                tr.setAttribute('id', "tr" + y);

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
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
