///<reference path="deviceDriver.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* ----------------------------------
DeviceDriverKeyboard.ts
Requires deviceDriver.ts
The Kernel Keyboard Device Driver.
---------------------------------- */
var TSOS;
(function (TSOS) {
    // Extends DeviceDriver
    var DeviceDriverKeyboard = (function (_super) {
        __extends(DeviceDriverKeyboard, _super);
        function DeviceDriverKeyboard() {
            // Override the base method pointers.
            _super.call(this, this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }
        // TODO: Get below dictionary format to work in this program so as to replace the case statement implementation of symbol key recognition/printing
        /*public symbolCharCodeASCIIMatch: {[keycode: string] : number[];} = {
        '186' : [59], //;
        '187' : [61], //=
        '188' : [44], //,
        '189' : [45], //-
        '190' : [46], //.
        '191' : [47], ///
        '192' : [96], //`
        '219' : [91], //[
        '220' : [92], //\
        '221' : [93], //]
        '222' : [39]  //'
        };
        
        public symbolCharCodeASCIIMatchShift: {[keycode: string] : number[];} = {
        '48' : [41],   //)
        '49' : [33],   //!
        '50' : [64],   //@
        '51' : [35],   //#
        '52' : [36],   //$
        '53' : [37],   //%
        '54' : [94],   //^
        '55' : [38],   //&
        '56' : [42],   /*/
        /*
        '57' : [40],   //(
        '186' : [58],  //:
        '187' : [43],  //+
        '188' : [60],  //<
        '189' : [95],  //_
        '190' : [62],  //>
        '191' : [63],  //?
        '192' : [126], //~
        '219' : [123], //{
        '220' : [124], //|
        '221' : [125], //}
        '222' : [34]   //"
        };
        
        public findASCIIFromKeyCodeShift(keys: number): number {
        if (keys in this.symbolCharCodeASCIIMatchShift) {
        return this.symbolCharCodeASCIIMatchShift.keys[0];
        }
        }
        
        public findASCIIFromKeyCode(keys: number): number {
        if (keys in this.symbolCharCodeASCIIMatch) {
        return this.symbolCharCodeASCIIMatch.keys[0];
        }
        }*/
        DeviceDriverKeyboard.prototype.krnKbdDriverEntry = function () {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        };

        DeviceDriverKeyboard.prototype.krnKbdDispatchKeyPress = function (params) {
            // Parse the params.    TODO: Check that they are valid and osTrapError if not.
            var keyCode = params[0];

            //_StdOut.putText("Key Code: " + params[0]);
            //_StdOut.advanceLine();
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";

            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) || ((keyCode >= 97) && (keyCode <= 123))) {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);

                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }

                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (((keyCode >= 48) && (keyCode <= 57) && (!isShifted)) || (keyCode === 32) || (keyCode === 13)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            } else if ((keyCode === 38) || (keyCode === 40)) {
                _Console.scrollPrevCommands(keyCode);
            } else if (keyCode === 8) {
                _Console.backspace();
            } else if (keyCode === 9) {
                _Console.tabComplete();
            } else if (((keyCode >= 186) && (keyCode <= 192)) || ((keyCode >= 219) && (keyCode <= 222)) || ((keyCode >= 48) && (keyCode <= 57) && (isShifted))) {
                if (isShifted) {
                    chr = String.fromCharCode(this.findASCIIFromKeyCodeShift(keyCode));
                    _KernelInputQueue.enqueue(chr);
                } else {
                    chr = String.fromCharCode(this.findASCIIFromKeyCode(keyCode));
                    _KernelInputQueue.enqueue(chr);
                }
            }
        };

        // Apologizing to all readers for this atrocious switch statement... Still in the process of figuring out typescript dictionary formatting and access
        // Returns the corresponding ASCII value of a given key code for shifted symbol characters
        DeviceDriverKeyboard.prototype.findASCIIFromKeyCodeShift = function (keys) {
            switch (keys) {
                case 48: {
                    return 41;
                }
                case 49: {
                    return 33;
                }
                case 50: {
                    return 64;
                }
                case 51: {
                    return 35;
                }
                case 52: {
                    return 36;
                }
                case 53: {
                    return 37;
                }
                case 54: {
                    return 94;
                }
                case 55: {
                    return 38;
                }
                case 56: {
                    return 42;
                }
                case 57: {
                    return 40;
                }
                case 186: {
                    return 58;
                }
                case 187: {
                    return 43;
                }
                case 188: {
                    return 60;
                }
                case 189: {
                    return 95;
                }
                case 190: {
                    return 62;
                }
                case 191: {
                    return 63;
                }
                case 192: {
                    return 126;
                }
                case 219: {
                    return 123;
                }
                case 220: {
                    return 124;
                }
                case 221: {
                    return 125;
                }
                case 222: {
                    return 34;
                }
            }
        };

        // Shield your eyes again... Dirty switch statement that gets the job done
        // Returns the corresponding ASCII value of a given key code for non-shifted symbol characters
        DeviceDriverKeyboard.prototype.findASCIIFromKeyCode = function (keys) {
            switch (keys) {
                case 186: {
                    return 59;
                }
                case 187: {
                    return 61;
                }
                case 188: {
                    return 44;
                }
                case 189: {
                    return 45;
                }
                case 190: {
                    return 46;
                }
                case 191: {
                    return 47;
                }
                case 192: {
                    return 96;
                }
                case 219: {
                    return 91;
                }
                case 220: {
                    return 92;
                }
                case 221: {
                    return 93;
                }
                case 222: {
                    return 39;
                }
            }
        };
        return DeviceDriverKeyboard;
    })(TSOS.DeviceDriver);
    TSOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(TSOS || (TSOS = {}));
