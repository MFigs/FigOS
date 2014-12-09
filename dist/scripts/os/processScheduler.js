var TSOS;
(function (TSOS) {
    var ProcessScheduler = (function () {
        function ProcessScheduler() {
            this.scheduleAlgorithm = 0;
            this.programCount = 0;
        }
        ProcessScheduler.prototype.handleScheduling = function () {
            if (_ProcessScheduler.scheduleAlgorithm === 0) {
                _PCBArray[_CPU.currentPID].quantumCycleCount += 1;

                if (_PCBArray[_CPU.currentPID].quantumCycleCount === _Quantum) {
                    if (!_ReadyQueue.isEmpty())
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(TIMER_IRQ, null));
                    else
                        _PCBArray[_CPU.currentPID].quantumCycleCount = 0;
                }
            }
        };

        ProcessScheduler.prototype.contextSwitch = function () {
            if (!_ReadyQueue.isEmpty()) {
                var oldPCB = _PCBArray[_CPU.currentPID];
                var currMemBlock = _CurrentMemBlock;

                var currPCB = _ReadyQueue.dequeue();

                if (currPCB.swapFileName !== "") {
                    _krnHDDDriver.readFile(currPCB.swapFileName, "krn");
                    var stringToDisk = _Kernel.memManager.loadMemBlock(currMemBlock);
                    _Kernel.memManager.clearMemBlock(currMemBlock);
                    _Kernel.memManager.loadMem(currMemBlock, _TempSwapFileData);
                    currPCB.updateLoc();
                    oldPCB.swapFileName = currPCB.swapFileName;
                    oldPCB.updateLoc();
                    currPCB.swapFileName = "";

                    _ResidentPCBList[_CPU.currentPID] = 4;
                    _ResidentPCBList[currPCB.PID] = currMemBlock + 1;

                    _krnHDDDriver.writeFile(oldPCB.swapFileName, stringToDisk, "krn");

                    console.log("PROC " + oldPCB.PID + " MOVED TO DISK; PROC " + currPCB.PID + " MOVED TO MEM BLOCK " + currMemBlock);
                }

                _PCBArray[_CPU.currentPID].procStatus = "Ready";
                _ReadyQueue.enqueue(_PCBArray[_CPU.currentPID]);

                _CurrentMemBlock = _ResidentPCBList[currPCB.PID] - 1;
                currPCB.quantumCycleCount = 0;
                currPCB.procStatus = "Running";
                _CPU.loadCPU(currPCB);

                console.log("CONTEXT SWITCH: Process " + oldPCB.PID + " added to ready queue; Process " + currPCB.PID + " loaded to CPU");
            } else {
                _PCBArray[_CPU.currentPID].quantumCycleCount = 0;
            }
        };

        ProcessScheduler.prototype.contextSwitchDrop = function () {
            if (!_ReadyQueue.isEmpty()) {
                var oldPCB = _PCBArray[_CPU.currentPID];

                _PCBArray[_CPU.currentPID].procStatus = "Terminated";
                _ProcessScheduler.programCount -= 1;
                var currPCB = _ReadyQueue.dequeue();

                if (currPCB.swapFileName !== "") {
                    var currMemBlock = _CurrentMemBlock;
                    _krnHDDDriver.readFile(currPCB.swapFileName, "krn");
                    _Kernel.memManager.clearMemBlock(currMemBlock);
                    _Kernel.memManager.loadMem(currMemBlock, _TempSwapFileData);
                    currPCB.updateLoc();
                    currPCB.swapFileName = "";

                    _ResidentPCBList[currPCB.PID] = currMemBlock + 1;

                    console.log("PROC " + currPCB.PID + " MOVED TO MEM BLOCK " + currMemBlock);
                }

                _CurrentMemBlock = _ResidentPCBList[currPCB.PID] - 1;
                currPCB.quantumCycleCount = 0;
                _CPU.loadCPU(currPCB);

                console.log("CONTEXT SWITCH: Process " + oldPCB.PID + " terminated; Process " + currPCB.PID + " loaded to CPU");
            } else {
                _PCBArray[_CPU.currentPID].procStatus = "Terminated";
                _CPU.isExecuting = false;
            }
        };
        return ProcessScheduler;
    })();
    TSOS.ProcessScheduler = ProcessScheduler;
})(TSOS || (TSOS = {}));
