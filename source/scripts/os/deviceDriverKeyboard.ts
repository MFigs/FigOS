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
                (keyCode === 32) ||                              // space
                (keyCode === 13)) {                              // enter
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


            else if (((keyCode >= 186) && (keyCode <= 192)) || ((keyCode >= 219) && (keyCode <= 222)) || ((keyCode >= 48) && (keyCode <= 57) && (isShifted))) {
                if (isShifted) {
                    chr = String.fromCharCode(this.findASCIIFromKeyCodeShift(keyCode));
                    _KernelInputQueue.enqueue(chr);
                }
                else {
                    chr = String.fromCharCode(this.findASCIIFromKeyCode(keyCode));
                    _KernelInputQueue.enqueue(chr);
                }
            }
        }

        // Apologizing to all readers for this atrocious switch statement... Still in the process of figuring out typescript dictionary formatting and access
        // Returns the corresponding ASCII value of a given key code for shifted symbol characters
        public findASCIIFromKeyCodeShift(keys): number {
            switch (keys) {
                case 48 : {return 41;}   //)
                case 49 : {return 33;}   //!
                case 50 : {return 64;}   //@
                case 51 : {return 35;}   //#
                case 52 : {return 36;}   //$
                case 53 : {return 37;}   //%
                case 54 : {return 94;}   //^
                case 55 : {return 38;}   //&
                case 56 : {return 42;}   //*
                case 57 : {return 40;}   //(
                case 186 : {return 58;}  //:
                case 187 : {return 43;}  //+
                case 188 : {return 60;}  //<
                case 189 : {return 95;}  //_
                case 190 : {return 62;}  //>
                case 191 : {return 63;}  //?
                case 192 : {return 126;} //~
                case 219 : {return 123;} //{
                case 220 : {return 124;} //|
                case 221 : {return 125;} //}
                case 222 : {return 34;}  //"
            }
        }

        // Shield your eyes again... Dirty switch statement that gets the job done
        // Returns the corresponding ASCII value of a given key code for non-shifted symbol characters
        public findASCIIFromKeyCode(keys): number {
            switch (keys) {
                case 186 : {return 59;}  //;
                case 187 : {return 61;}  //=
                case 188 : {return 44;}  //,
                case 189 : {return 45;}  //-
                case 190 : {return 46;}  //.
                case 191 : {return 47;}  ///
                case 192 : {return 96;}  //`
                case 219 : {return 91;}  //[
                case 220 : {return 92;}  //\
                case 221 : {return 93;}  //]
                case 222 : {return 39;}  //'
            }
        }

    }
}
