var TSOS;
(function (TSOS) {
    var ProgramCommand = (function () {
        function ProgramCommand(comm) {
            this.arg1 = "";
            this.arg2 = "";
            this.command = comm;
            this.analyzeCommand();
        }
        ProgramCommand.prototype.translateFromHexString = function (inputString) {
            var decimalValue = 0;
            switch (inputString.charAt(0)) {
                case '0': {
                    break;
                }
                case '1': {
                    decimalValue += 1;
                    break;
                }
                case '2': {
                    decimalValue += 2;
                    break;
                }
                case '3': {
                    decimalValue += 3;
                    break;
                }
                case '4': {
                    decimalValue += 4;
                    break;
                }
                case '5': {
                    decimalValue += 5;
                    break;
                }
                case '6': {
                    decimalValue += 6;
                    break;
                }
                case '7': {
                    decimalValue += 7;
                    break;
                }
                case '8': {
                    decimalValue += 8;
                    break;
                }
                case '9': {
                    decimalValue += 9;
                    break;
                }
                case 'A': {
                    decimalValue += 10;
                    break;
                }
                case 'B': {
                    decimalValue += 11;
                    break;
                }
                case 'C': {
                    decimalValue += 12;
                    break;
                }
                case 'D': {
                    decimalValue += 13;
                    break;
                }
                case 'E': {
                    decimalValue += 14;
                    break;
                }
                case 'F': {
                    decimalValue += 15;
                    break;
                }
            }

            decimalValue *= 16;

            switch (inputString.charAt(1)) {
                case '0': {
                    break;
                }
                case '1': {
                    decimalValue += 1;
                    break;
                }
                case '2': {
                    decimalValue += 2;
                    break;
                }
                case '3': {
                    decimalValue += 3;
                    break;
                }
                case '4': {
                    decimalValue += 4;
                    break;
                }
                case '5': {
                    decimalValue += 5;
                    break;
                }
                case '6': {
                    decimalValue += 6;
                    break;
                }
                case '7': {
                    decimalValue += 7;
                    break;
                }
                case '8': {
                    decimalValue += 8;
                    break;
                }
                case '9': {
                    decimalValue += 9;
                    break;
                }
                case 'A': {
                    decimalValue += 10;
                    break;
                }
                case 'B': {
                    decimalValue += 11;
                    break;
                }
                case 'C': {
                    decimalValue += 12;
                    break;
                }
                case 'D': {
                    decimalValue += 13;
                    break;
                }
                case 'E': {
                    decimalValue += 14;
                    break;
                }
                case 'F': {
                    decimalValue += 15;
                    break;
                }
            }

            return decimalValue;
        };

        ProgramCommand.prototype.translateToHexString = function (inputNum) {
            var outputHexString = "";
            var lowOrderDigit = inputNum % 16;
            var highOrderDigit = (inputNum - lowOrderDigit) / 16;

            switch (highOrderDigit) {
                case 0: {
                    outputHexString = "0";
                    break;
                }
                case 1: {
                    outputHexString = "1";
                    break;
                }
                case 2: {
                    outputHexString = "2";
                    break;
                }
                case 3: {
                    outputHexString = "3";
                    break;
                }
                case 4: {
                    outputHexString = "4";
                    break;
                }
                case 5: {
                    outputHexString = "5";
                    break;
                }
                case 6: {
                    outputHexString = "6";
                    break;
                }
                case 7: {
                    outputHexString = "7";
                    break;
                }
                case 8: {
                    outputHexString = "8";
                    break;
                }
                case 9: {
                    outputHexString = "9";
                    break;
                }
                case 10: {
                    outputHexString = "A";
                    break;
                }
                case 11: {
                    outputHexString = "B";
                    break;
                }
                case 12: {
                    outputHexString = "C";
                    break;
                }
                case 13: {
                    outputHexString = "D";
                    break;
                }
                case 14: {
                    outputHexString = "E";
                    break;
                }
                case 15: {
                    outputHexString = "F";
                    break;
                }
            }

            switch (lowOrderDigit) {
                case 0: {
                    outputHexString = outputHexString + "0";
                    break;
                }
                case 1: {
                    outputHexString = outputHexString + "1";
                    break;
                }
                case 2: {
                    outputHexString = outputHexString + "2";
                    break;
                }
                case 3: {
                    outputHexString = outputHexString + "3";
                    break;
                }
                case 4: {
                    outputHexString = outputHexString + "4";
                    break;
                }
                case 5: {
                    outputHexString = outputHexString + "5";
                    break;
                }
                case 6: {
                    outputHexString = outputHexString + "6";
                    break;
                }
                case 7: {
                    outputHexString = outputHexString + "7";
                    break;
                }
                case 8: {
                    outputHexString = outputHexString + "8";
                    break;
                }
                case 9: {
                    outputHexString = outputHexString + "9";
                    break;
                }
                case 10: {
                    outputHexString = outputHexString + "A";
                    break;
                }
                case 11: {
                    outputHexString = outputHexString + "B";
                    break;
                }
                case 12: {
                    outputHexString = outputHexString + "C";
                    break;
                }
                case 13: {
                    outputHexString = outputHexString + "D";
                    break;
                }
                case 14: {
                    outputHexString = outputHexString + "E";
                    break;
                }
                case 15: {
                    outputHexString = outputHexString + "F";
                    break;
                }
            }

            return outputHexString;
        };

        ProgramCommand.prototype.analyzeCommand = function () {
            switch (this.command) {
                case "A9": {
                    // Load the Accumulator with constant
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "AD": {
                    // Load the Accumulator from memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "8D": {
                    // Store the Accumulator in memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "6D": {
                    // Add with carry from address to accumulator
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "A2": {
                    // Load x register with a constant
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "AE": {
                    // Load x register from memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "A0": {
                    // Load y register with a constant
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "AC": {
                    // Load y register from memory
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "EA": {
                    break;
                }
                case "00": {
                    break;
                }
                case "EC": {
                    // Compare value in memory to x register and sets z flag if equal
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "D0": {
                    // Branch # of bytes if z flag is set to zero
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    break;
                }
                case "EE": {
                    // Increment the value of a byte
                    this.arg1 = _Kernel.memManager.accessMem(_CPU.PC + 1);
                    this.arg2 = _Kernel.memManager.accessMem(_CPU.PC + 2);
                    break;
                }
                case "FF": {
                    break;
                    // $01 in x reg is print y register content
                    // $02 in x reg is print 00-terminated string at address in y register
                }
            }
        };

        ProgramCommand.prototype.executeCommand = function () {
            switch (this.command) {
                case "A9": {
                    // Load the Accumulator with constant
                    _CPU.Acc = this.translateFromHexString(this.arg1);
                    _CPU.PC += 2;
                    break;
                }
                case "AD": {
                    // Load the Accumulator from memory
                    _CPU.Acc = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateFromHexString(this.arg2 + this.arg1)));
                    _CPU.PC += 3;
                    break;
                }
                case "8D": {
                    // Store the Accumulator in memory
                    var address = this.translateFromHexString(this.arg2 + this.arg1);
                    _Kernel.memManager.storeMem(address, this.translateToHexString(_CPU.Acc));
                    _CPU.PC += 3;
                    break;
                }
                case "6D": {
                    // TODO: HANDLE CARRY
                    // Add with carry from address to accumulator
                    var addValue = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateFromHexString(this.arg2 + this.arg1)));
                    _CPU.Acc = _CPU.Acc + addValue;
                    _CPU.PC += 3;
                    break;
                }
                case "A2": {
                    // Load x register with a constant
                    _CPU.Xreg = this.translateFromHexString(this.arg1);
                    _CPU.PC += 2;
                    break;
                }
                case "AE": {
                    // Load x register from memory
                    _CPU.Xreg = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateFromHexString(this.arg2 + this.arg1)));
                    _CPU.PC += 3;
                    break;
                }
                case "A0": {
                    // Load y register with a constant
                    _CPU.Yreg = this.translateFromHexString(this.arg1);
                    _CPU.PC += 2;
                    break;
                }
                case "AC": {
                    // Load y register from memory
                    _CPU.Yreg = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateFromHexString(this.arg2 + this.arg1)));
                    _CPU.PC += 3;
                    break;
                }
                case "EA": {
                    // No operation
                    _CPU.PC += 1;
                    break;
                }
                case "00": {
                    // Break from program
                    //_CPU.isExecuting = false;
                    _IsProgramComplete = true;
                    break;
                }
                case "EC": {
                    // Compare value in memory to x register and sets z flag if equal
                    if (_CPU.Xreg === this.translateFromHexString(_Kernel.memManager.accessMem(this.translateFromHexString(this.arg2 + this.arg1)))) {
                        _CPU.Zflag = 1;
                    } else {
                        _CPU.Zflag = 0;
                    }
                    _CPU.PC += 3;
                    break;
                }
                case "D0": {
                    // Branch # of bytes if z flag is set to zero
                    if (_CPU.Zflag === 0) {
                        var memLocJumped = (_CPU.PC + this.translateFromHexString(this.arg1)) % 256;
                        _CPU.PC = memLocJumped;
                        //_CPU.PC += 2;   ???
                    } else {
                        _CPU.PC += 2;
                    }
                    break;
                }
                case "EE": {
                    // Increment the value of a byte
                    // TODO: Check Memory Bounds
                    var incrementedByteValue = this.translateFromHexString(_Kernel.memManager.accessMem(this.translateFromHexString(this.arg2 + this.arg1))) + 1;
                    _Kernel.memManager.storeMem(this.translateFromHexString(this.arg2 + this.arg1), this.translateToHexString(incrementedByteValue));
                    _CPU.PC += 3;
                    break;
                }
                case "FF": {
                    // System call:
                    // $01 in x reg is print y register content
                    if (_CPU.Xreg === 1) {
                        _StdOut.putText(_CPU.Yreg);
                        break;
                    } else if (_CPU.Xreg === 2) {
                        _StdOut.putText(_Kernel.memManager.accessMem(_CPU.Yreg));
                        break;
                    }
                    break;
                }
            }
        };
        return ProgramCommand;
    })();
    TSOS.ProgramCommand = ProgramCommand;
})(TSOS || (TSOS = {}));
