module TSOS {

    export class ProgramCommand {

        public command: string;
        public arg1: string = "";
        public arg2: string = "";

        constructor(comm: string) {

            this.command = comm;
            this.analyzeCommand();

        }

        public translateFromHexString(inputString: string): number {
            var decimalValue: number = 0;
            switch(inputString.charAt(0)) {
                case '0': {break;}
                case '1': {decimalValue += 1; break;}
                case '2': {decimalValue += 2; break;}
                case '3': {decimalValue += 3; break;}
                case '4': {decimalValue += 4; break;}
                case '5': {decimalValue += 5; break;}
                case '6': {decimalValue += 6; break;}
                case '7': {decimalValue += 7; break;}
                case '8': {decimalValue += 8; break;}
                case '9': {decimalValue += 9; break;}
                case 'A': {decimalValue += 10; break;}
                case 'B': {decimalValue += 11; break;}
                case 'C': {decimalValue += 12; break;}
                case 'D': {decimalValue += 13; break;}
                case 'E': {decimalValue += 14; break;}
                case 'F': {decimalValue += 15; break;}
            }

            decimalValue *= 16;

            switch(inputString.charAt(1)) {
                case '0': {break;}
                case '1': {decimalValue += 1; break;}
                case '2': {decimalValue += 2; break;}
                case '3': {decimalValue += 3; break;}
                case '4': {decimalValue += 4; break;}
                case '5': {decimalValue += 5; break;}
                case '6': {decimalValue += 6; break;}
                case '7': {decimalValue += 7; break;}
                case '8': {decimalValue += 8; break;}
                case '9': {decimalValue += 9; break;}
                case 'A': {decimalValue += 10; break;}
                case 'B': {decimalValue += 11; break;}
                case 'C': {decimalValue += 12; break;}
                case 'D': {decimalValue += 13; break;}
                case 'E': {decimalValue += 14; break;}
                case 'F': {decimalValue += 15; break;}
            }

            return decimalValue;

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

        public translateAddressFromHexString(inputString: string): number {
            var decimalValue: number = 0;

            switch(inputString.charAt(0)) {
                case '0': {break;}
                case '1': {decimalValue += 4096; break;}
                case '2': {decimalValue += 8192; break;}
                case '3': {decimalValue += 12288; break;}
                case '4': {decimalValue += 16384; break;}
                case '5': {decimalValue += 20480; break;}
                case '6': {decimalValue += 24576; break;}
                case '7': {decimalValue += 28672; break;}
                case '8': {decimalValue += 32768; break;}
                case '9': {decimalValue += 36864; break;}
                case 'A': {decimalValue += 40960; break;}
                case 'B': {decimalValue += 45056; break;}
                case 'C': {decimalValue += 49152; break;}
                case 'D': {decimalValue += 53248; break;}
                case 'E': {decimalValue += 57344; break;}
                case 'F': {decimalValue += 61440; break;}
            }

            switch(inputString.charAt(1)) {
                case '0': {break;}
                case '1': {decimalValue += 256; break;}
                case '2': {decimalValue += 512; break;}
                case '3': {decimalValue += 768; break;}
                case '4': {decimalValue += 1024; break;}
                case '5': {decimalValue += 1280; break;}
                case '6': {decimalValue += 1536; break;}
                case '7': {decimalValue += 1792; break;}
                case '8': {decimalValue += 2048; break;}
                case '9': {decimalValue += 2304; break;}
                case 'A': {decimalValue += 2560; break;}
                case 'B': {decimalValue += 2816; break;}
                case 'C': {decimalValue += 3072; break;}
                case 'D': {decimalValue += 3328; break;}
                case 'E': {decimalValue += 3584; break;}
                case 'F': {decimalValue += 3840; break;}
            }

            switch(inputString.charAt(2)) {
                case '0': {break;}
                case '1': {decimalValue += 16; break;}
                case '2': {decimalValue += 32; break;}
                case '3': {decimalValue += 48; break;}
                case '4': {decimalValue += 64; break;}
                case '5': {decimalValue += 80; break;}
                case '6': {decimalValue += 96; break;}
                case '7': {decimalValue += 112; break;}
                case '8': {decimalValue += 128; break;}
                case '9': {decimalValue += 144; break;}
                case 'A': {decimalValue += 160; break;}
                case 'B': {decimalValue += 176; break;}
                case 'C': {decimalValue += 192; break;}
                case 'D': {decimalValue += 208; break;}
                case 'E': {decimalValue += 224; break;}
                case 'F': {decimalValue += 240; break;}
            }

            switch(inputString.charAt(3)) {
                case '0': {break;}
                case '1': {decimalValue += 1; break;}
                case '2': {decimalValue += 2; break;}
                case '3': {decimalValue += 3; break;}
                case '4': {decimalValue += 4; break;}
                case '5': {decimalValue += 5; break;}
                case '6': {decimalValue += 6; break;}
                case '7': {decimalValue += 7; break;}
                case '8': {decimalValue += 8; break;}
                case '9': {decimalValue += 9; break;}
                case 'A': {decimalValue += 10; break;}
                case 'B': {decimalValue += 11; break;}
                case 'C': {decimalValue += 12; break;}
                case 'D': {decimalValue += 13; break;}
                case 'E': {decimalValue += 14; break;}
                case 'F': {decimalValue += 15; break;}
            }

            return (decimalValue % 256);

        }

        public analyzeCommand() {

            switch(this.command) {
                case "A9":
                {
                    // Load the Accumulator with constant
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "AD":
                {
                    // Load the Accumulator from memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "8D":
                {
                    // Store the Accumulator in memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "6D":
                {
                    // Add with carry from address to accumulator
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "A2":
                {
                    // Load x register with a constant
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "AE":
                {
                    // Load x register from memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "A0":
                {
                    // Load y register with a constant
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "AC":
                {
                    // Load y register from memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "EA":
                {
                    break;// No operation
                }
                case "00":
                {
                    break;// Break from program
                }
                case "EC":
                {
                    // Compare value in memory to x register and sets z flag if equal
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "D0":
                {
                    // Branch # of bytes if z flag is set to zero
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "EE":
                {
                    // Increment the value of a byte
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "FF":
                {
                    break;// System call:
                    // $01 in x reg is print y register content
                    // $02 in x reg is print 00-terminated string at address in y register
                }
            }

        }

        public executeCommand() {

            switch(this.command) {
                case "A9":
                {
                    // Load the Accumulator with constant
                    _CPU.Acc = this.translateFromHexString(this.arg1);
                    _PCBArray[_CPU.currentPID].accum = _CPU.Acc;
                    _CPU.PC += 2;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "AD":
                {
                    // Load the Accumulator from memory
                    _CPU.Acc = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateAddressFromHexString(this.arg2 + this.arg1)));
                    _PCBArray[_CPU.currentPID].accum = _CPU.Acc;
                    _CPU.PC += 3;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "8D":
                {
                    // Store the Accumulator in memory
                    var address: number = this.translateAddressFromHexString(this.arg2 + this.arg1);
                    //_StdOut.putText("Adr: " + address + " ");
                    var storeVal = this.translateToHexString(_CPU.Acc);
                    //_StdOut.putText(storeVal);
                    _Kernel.memManager.storeMem(address, storeVal);
                    _CPU.PC += 3;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "6D":
                {

                    // TODO: HANDLE CARRY

                    // Add with carry from address to accumulator
                    var addValue: number = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateAddressFromHexString(this.arg2 + this.arg1)));
                    _CPU.Acc = _CPU.Acc + addValue;
                    _PCBArray[_CPU.currentPID].accum = _CPU.Acc;
                    _CPU.PC += 3;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "A2":
                {
                    // Load x register with a constant
                    _CPU.Xreg = this.translateFromHexString(this.arg1);
                    _PCBArray[_CPU.currentPID].xReg = _CPU.Xreg;
                    _CPU.PC += 2;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "AE":
                {
                    // Load x register from memory
                    _CPU.Xreg = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateAddressFromHexString(this.arg2 + this.arg1)));
                    _PCBArray[_CPU.currentPID].xReg = _CPU.Xreg;
                    _CPU.PC += 3;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "A0":
                {
                    // Load y register with a constant
                    _CPU.Yreg = this.translateFromHexString(this.arg1);
                    _PCBArray[_CPU.currentPID].yReg = _CPU.Yreg;
                    _CPU.PC += 2;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "AC":
                {
                    // Load y register from memory
                    _CPU.Yreg = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateAddressFromHexString(this.arg2 + this.arg1)));
                    _PCBArray[_CPU.currentPID].yReg = _CPU.Yreg;
                    _CPU.PC += 3;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "EA":
                {
                    // No operation
                    _CPU.PC += 1;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "00":
                {
                    // Break from program
                    _CPU.PC += 1;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;


                    if (_ReadyQueue.isEmpty()) {
                        _ActiveProgramExists = false;
                        _StdOut.advanceLine();
                        _StdOut.putText(_PromptStr);
                    }

                    /*_StdOut.advanceLine();
                    _StdOut.putText("PID: " + _PCBArray[_CPU.currentPID].PID);
                    _StdOut.advanceLine();
                    _StdOut.putText("PC: " + _PCBArray[_CPU.currentPID].progCounter);
                    _StdOut.advanceLine();
                    _StdOut.putText("ACC: " + _PCBArray[_CPU.currentPID].accum);
                    _StdOut.advanceLine();
                    _StdOut.putText("X Reg: " + _PCBArray[_CPU.currentPID].xReg);
                    _StdOut.advanceLine();
                    _StdOut.putText("Y Reg: " + _PCBArray[_CPU.currentPID].yReg);
                    _StdOut.advanceLine();
                    _StdOut.putText("Z Flag: " + _PCBArray[_CPU.currentPID].zFlag);
                    _StdOut.advanceLine();
                    _StdOut.putText(_PromptStr);*/

                    _KernelInterruptQueue.enqueue(new Interrupt(TIMER_KILL_ACTIVE_IRQ, null));

                    break;
                }
                case "EC":
                {
                    // Compare value in memory to x register and sets z flag if equal
                    if (_CPU.Xreg === this.translateFromHexString(_Kernel.memManager.accessMem(this.translateAddressFromHexString(this.arg2 + this.arg1)))) {
                        _CPU.Zflag = 1;
                        _PCBArray[_CPU.currentPID].zFlag = _CPU.Zflag;
                    }
                    else {
                        _CPU.Zflag = 0;
                        _PCBArray[_CPU.currentPID].zFlag = 0;
                    }
                    _CPU.PC += 3;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "D0":
                {
                    // Branch # of bytes if z flag is set to zero
                    if (_CPU.Zflag === 0) {
                        _CPU.PC += 2;
                        var memLocJumped = (_CPU.PC + this.translateFromHexString(this.arg1)) % 256;
                        _CPU.PC = memLocJumped;
                        _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;

                    }
                    else {
                        _CPU.PC += 2;
                        _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    }
                    break;
                }
                case "EE":
                {
                    // Increment the value of a byte
                    // TODO: Check Memory Bounds

                    var byteValue: number = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateAddressFromHexString(this.arg2 + this.arg1)));
                    //_StdOut.putText("" + byteValue);
                    byteValue += 1;
                    //_StdOut.putText("" + byteValue);
                    _Kernel.memManager.storeMem(this.translateAddressFromHexString(this.arg2 + this.arg1), this.translateToHexString(byteValue));
                    _CPU.PC += 3;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;
                    break;
                }
                case "FF":
                {
                    // System call:
                    // $01 in x reg is print y register content
                    if (_CPU.Xreg === 1) {
                        var output: string = "" + _CPU.Yreg;
                        _StdOut.putText(output);
                    }

                    // $02 in x reg is print 00-terminated string at address in y register
                    else if(_CPU.Xreg === 2) {

                        var tempPCPointer: number = _CPU.Yreg;
                        var cellData: string = _Kernel.memManager.accessMem(tempPCPointer);
                        var outputStr: string = "";

                        while (cellData != "00") {

                            var convertedData = String.fromCharCode(this.translateFromHexString(cellData));
                            outputStr = outputStr + convertedData;
                            tempPCPointer += 1;
                            cellData = _Kernel.memManager.accessMem(tempPCPointer);
                            //_StdOut.putText("stuck?");

                        }

                        _StdOut.putText(outputStr);

                    }

                    _CPU.PC += 1;
                    _PCBArray[_CPU.currentPID].progCounter = _CPU.PC;

                    break;
                }
            }


        }

    }

}
