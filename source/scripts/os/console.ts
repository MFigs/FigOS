///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public buffer = "") {

        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        private clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        private resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
        }

        public putText(inText): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            if (inText !== "") {
                var splitText = inText.split("");
                var index = 0;
                var text = splitText[index];
                while(index < inText.length) {
                    var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                    if ((this.currentXPosition + offset) > _Canvas.width) {
                        this.advanceLine();
                        this.currentXPosition += 30;
                    }
                    // Draw the text at the current X and Y coordinates.
                    _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                    // Move the current X position.
                    this.currentXPosition = this.currentXPosition + offset;
                    index++;
                    text = splitText[index];
                }
            }
         }

        public advanceLine(): void {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            this.currentYPosition += _DefaultFontSize + 
                                     _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                     _FontHeightMargin;

            // Shift the canvas up when text/shell commands drop below the canvas
            while (this.currentYPosition > _Canvas.height - 2) {
                var canImg = _DrawingContext.getImageData(0, this.currentFontSize, 500, 561);
                _DrawingContext.putImageData(canImg, 0, 0);
                this.currentYPosition -= this.currentFontSize;
            }
        }

        public displayBSOD(msg): void {
            //_StdOut.putText("KERNEL ERROR: " + msg);

            _StdOut.clearScreen();

            _Canvas = <HTMLCanvasElement> document.getElementById("display");
            _Canvas.style.backgroundColor = "#0000FF";
            var can = _Canvas.getContext("2d");
            can.fillStyle = "#FFFFFF";
            can.font = "12px Comic Sans MS";
            can.fillText("KERNEL ERROR: \n" + msg + "...\n Please Restart OS...", 5, 280);
            //can.fill();

            
            // TODO: Figure out why code below would not print anything to canvas

            //var can = _DrawingContext.getElementById['divConsole'];
            //var can1 = can.getElementById['display'];
            //var canPrint= can1.getContext("2d");
            //canPrint.rect(0, 0, _Canvas.width, _Canvas.height);
            //canPrint.fillStyle="0000FF";
            //canPrint.fill();
            //canPrint.font = "40px Arial";
            //canPrint.fillText("KERNEL ERROR: " + msg, 0, this.currentFontSize);
        }

        public scrollPrevCommands(keycode): void {
            if (keycode === 38) {   // If up key is pushed...
                // Clear buffer and current line of scree, reset x position and reprint prompt
                _Console.buffer = "";
                _DrawingContext.clearRect(0, this.currentYPosition - this.currentFontSize, _Canvas.width, this.currentFontSize + 1);
                this.currentXPosition = 0;
                _StdOut.putText(_PromptStr);

                // Checking if going beyond oldest-called command, if show display oldest
                if (_OsShell.commandPointer <= 0) {
                    _OsShell.commandPointer = 0;
                    _Console.buffer = _OsShell.commandHistory[0];
                    _StdOut.putText(_Console.buffer);
                }
                else {
                    _Console.buffer = _OsShell.commandHistory[_OsShell.commandPointer];
                    _StdOut.putText(_Console.buffer);
                    _OsShell.commandPointer -= 1;
                }
            }
            else {                  // If down key is pushed...
                // Clear buffer and current line of scree, reset x position and reprint prompt
                _Console.buffer = "";
                _DrawingContext.clearRect(0, this.currentYPosition - this.currentFontSize, _Canvas.width, this.currentFontSize + 1);
                this.currentXPosition = 0;
                _StdOut.putText(_PromptStr);

                // Checking if going beyond most recently-called command, if show display most recent
                if (_OsShell.commandPointer >= _OsShell.commandPlacerCount) {
                    _OsShell.commandPointer = _OsShell.commandPlacerCount;
                    _Console.buffer = _OsShell.commandHistory[_OsShell.commandPlacerCount - 1];
                    _StdOut.putText(_Console.buffer);
                }
                else {
                    _Console.buffer = _OsShell.commandHistory[_OsShell.commandPointer];
                    _StdOut.putText(_Console.buffer);
                    _OsShell.commandPointer += 1;
                }
            }
        }

        public backspace(): void {
            // Checking for single character strings and handling string splitting differently
            if (_Console.buffer.length === 1) {
                // Remove most recent character from input buffer
                var bufferTailChar = _Console.buffer;
                _Console.buffer = "";

                // Clear character from screen
                _DrawingContext.clearRect(0, this.currentYPosition - this.currentFontSize, _Canvas.width, this.currentFontSize + 4);
                this.currentXPosition = 0;
                _StdOut.putText(_PromptStr);
            }
            else if (_Console.buffer.length >= 1) {
                // Remove most recent character from input buffer
                var bufferRemains = (_Console.buffer).substr(0, (_Console.buffer.length - 1));
                var bufferTailChar = (_Console.buffer).substr((_Console.buffer.length - 1), (_Console.buffer.length - 1));
                _Console.buffer = bufferRemains;

                // Clear character from screen
                _DrawingContext.clearRect(this.currentXPosition - _DrawingContext.measureText(this.currentFont, this.currentFontSize, bufferTailChar), this.currentYPosition - this.currentFontSize, _DrawingContext.measureText(this.currentFont, this.currentFontSize, bufferTailChar), this.currentFontSize + 4);
                this.currentXPosition = this.currentXPosition - _DrawingContext.measureText(this.currentFont, this.currentFontSize, bufferTailChar);
            }
        }

        public tabComplete(): void {
            var partialInput = _Console.buffer;
            //var index = 0;
            var found = false;
            while (!found && (_TabIndex < _OsShell.commandList.length)) {
                var testString = ((_OsShell.commandList[_TabIndex]).command).substring(0, partialInput.length);
                if (testString.localeCompare(partialInput) === 0) {
                    found = true;
                }
                else {
                    _TabIndex++;
                }
            }
            if (found) {
                _Console.buffer = _OsShell.commandList[_TabIndex].command;
                _Console.currentXPosition = 0;
                _DrawingContext.clearRect(0, this.currentYPosition - this.currentFontSize, _Canvas.width, this.currentFontSize + 1);
                _StdOut.putText(_PromptStr);
                _StdOut.putText(_Console.buffer);
                _TabIndex++;
            }
        }
    }
 }
