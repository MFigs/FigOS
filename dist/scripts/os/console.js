///<reference path="../globals.ts" />
/* ------------
Console.ts
Requires globals.ts
The OS Console - stdIn and stdOut by default.
Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
------------ */
var TSOS;
(function (TSOS) {
    var Console = (function () {
        function Console(currentFont, currentFontSize, currentXPosition, currentYPosition, buffer) {
            if (typeof currentFont === "undefined") { currentFont = _DefaultFontFamily; }
            if (typeof currentFontSize === "undefined") { currentFontSize = _DefaultFontSize; }
            if (typeof currentXPosition === "undefined") { currentXPosition = 0; }
            if (typeof currentYPosition === "undefined") { currentYPosition = _DefaultFontSize; }
            if (typeof buffer === "undefined") { buffer = ""; }
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
        }
        Console.prototype.init = function () {
            this.clearScreen();
            this.resetXY();
        };

        Console.prototype.clearScreen = function () {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        };

        Console.prototype.resetXY = function () {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        };

        Console.prototype.handleInput = function () {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();

                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) {
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
        };

        Console.prototype.putText = function (inText) {
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
                while (index < inText.length) {
                    var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                    if ((this.currentXPosition + offset) > _Canvas.width) {
                        this.advanceLine();
                    }

                    // Draw the text at the current X and Y coordinates.
                    _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);

                    // Move the current X position.
                    this.currentXPosition = this.currentXPosition + offset;
                    index++;
                    text = splitText[index];
                }
            }
        };

        Console.prototype.advanceLine = function () {
            this.currentXPosition = 0;

            /*
            * Font size measures from the baseline to the highest point in the font.
            * Font descent measures from the baseline to the lowest point in the font.
            * Font height margin is extra spacing between the lines.
            */
            this.currentYPosition += _DefaultFontSize + _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) + _FontHeightMargin;

            while (this.currentYPosition > _Canvas.height) {
                var canImg = _DrawingContext.getImageData(0, this.currentFontSize, 500, 561);
                _DrawingContext.putImageData(canImg, 0, 0);
                this.currentYPosition -= this.currentFontSize;
            }
        };

        Console.prototype.displayBSOD = function (msg) {
            _StdOut.putText("KERNEL ERROR: " + msg);
            //_DrawingContext.rect(0, 0, _Canvas.width, _Canvas.height);
            //_DrawingContext.fillStyle="#0000FF";
            //_DrawingContext.fill();
        };

        Console.prototype.scrollPrevCommands = function (keycode) {
            if (keycode === 38) {
                _Console.buffer = "";
                _DrawingContext.clearRect(0, this.currentYPosition, _Canvas.width, this.currentFontSize);
                _StdOut.putPrompt();
                if (_OsShell.commandPointer <= 0) {
                    _StdOut.putText(_OsShell.commandHistory[0]);
                } else {
                    _StdOut.putText(_OsShell.commandHistory[_OsShell.commandPointer]);
                    _OsShell.commandPointer -= 1;
                }
            } else {
                _Console.buffer = "";
                _DrawingContext.clearRect(0, this.currentYPosition, _Canvas.width, this.currentFontSize);
                _StdOut.putPrompt();
                if (_OsShell.commandPointer >= _OsShell.commandHistory.length) {
                    _StdOut.putText(_OsShell.commandHistory[_OsShell.commandHistory.length]);
                } else {
                    _StdOut.putText(_OsShell.commandHistory[_OsShell.commandPointer]);
                    _OsShell.commandPointer += 1;
                }
            }
        };

        Console.prototype.backspace = function () {
            // Remove most recent character from input buffer
            var bufferRemains = (_Console.buffer).substr(0, (_Console.buffer.length - 2));
            var bufferTailChar = (_Console.buffer).substr((_Console.buffer.length - 1), (_Console.buffer.length - 1));
            _Console.buffer = bufferRemains;

            // Clear character from screen
            _DrawingContext.clearRect(this.currentXPosition - _DrawingContext.measureText(bufferTailChar), this.currentYPosition, _DrawingContext.measureText(bufferTailChar), this.currentFontSize);
            this.currentXPosition = this.currentXPosition - _DrawingContext.measureText(bufferTailChar);
        };

        Console.prototype.tabComplete = function () {
            var partialInput = _Console.buffer;

            //var index = 0;
            var found = false;
            while (!found && _TabIndex < _OsShell.commandList.length) {
                if ((_OsShell.commandList[_TabIndex].command).substr(0, partialInput.length - 1) === partialInput) {
                    found = true;
                    _Console.buffer = _OsShell.commandList[_TabIndex].command;
                    _Console.currentXPosition = 0;
                    _DrawingContext.clearRect(0, this.currentYPosition, _Canvas.width, this.currentFontSize);
                    _StdOut.putPrompt();
                    _StdOut.putText(_Console.buffer);
                } else {
                    ++_TabIndex;
                }
            }
            if (found) {
                //this.execute();
            }
        };
        return Console;
    })();
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
