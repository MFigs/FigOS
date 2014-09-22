///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.
            super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }


        static symbolCharCodeASCIIMatch: {[keycode: number] : number;} = {
            186 : 59, //;
            187 : 61, //=
            188 : 44, //,
            189 : 45, //-
            190 : 46, //.
            191 : 47, ///
            192 : 96, //`
            219 : 91, //[
            220 : 92, //\
            221 : 93, //]
            222 : 39  //'
        };

        static symbolCharCodeASCIIMatchShift: {[keycode: number] : number;} = {
            48 : 41,   //)
            49 : 33,   //!
            50 : 64,   //@
            51 : 35,   //#
            52 : 36,   //$
            53 : 37,   //%
            54 : 94,   //^
            55 : 38,   //&
            56 : 42,   //*
            57 : 40,   //(
            186 : 58,  //:
            187 : 43,  //+
            188 : 60,  //<
            189 : 95,  //_
            190 : 62,  //>
            191 : 63,  //?
            192 : 126, //~
            219 : 123, //{
            220 : 124, //|
            221 : 125, //}
            222 : 34   //"
        };

        //public findASCIIFromKeyCodeShift(keycode): number {
        //    return symbolCharCodeASCIIMatchShift[keycode];
        //}

        //public findASCIIFromKeyCode(keycode): number {
        //    return symbolCharCodeASCIIMatch[keycode];
        //}

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.    TODO: Check that they are valid and osTrapError if not.
            var keyCode = params[0];
            //_StdOut.putText("Key Code: " + params[0]);
            //_StdOut.advanceLine();
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
                ((keyCode >= 97) && (keyCode <= 123))) {  // a..z {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            }
            else if (((keyCode >= 48) && (keyCode <= 57) && (!isShifted)) ||   // digits
                        (keyCode === 32)                     ||   // space
                        (keyCode === 13)) {                       // enter
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else if ((keyCode === 38) || (keyCode === 40)) {     // up arrow and down arrow
                _Console.scrollPrevCommands(keyCode);
            }
            else if (keyCode === 8) {                            // backspace
                _Console.backspace();
            }

            else if (keyCode === 9) {                            // tab key
                _Console.tabComplete();
            }

            //else if (((keyCode >= 186) && (keyCode <= 192)) || ((keyCode >= 219) && (keyCode <= 222)) || ((keyCode >= 48) && (keyCode <= 57) && (isShifted))){
            //    if (isShifted) {
            //        chr = String.fromCharCode(this.findASCIIFromKeyCodeShift(keyCode));
            //        _KernelInputQueue.enqueue(chr);
            //    }
            //    else {
            //        chr = String.fromCharCode(this.findASCIIFromKeyCode(keyCode));
            //        _KernelInputQueue.enqueue(chr);
            //    }
            //}

        }

    }
}
