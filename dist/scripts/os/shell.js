///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
///<reference path="../utils.ts" />
/* ------------
Shell.ts
The OS Shell - The "command line interface" (CLI) for the console.
------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
// test
var TSOS;
(function (TSOS) {
    var Shell = (function () {
        function Shell() {
            // Properties
            //public promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
            this.commandHistory = [];
            this.commandPointer = 0;
            this.commandPlacerCount = 0;
        }
        Shell.prototype.init = function () {
            var sc = null;

            //
            // Load the command list.
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;

            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- Displays the current date and time.");
            this.commandList[this.commandList.length] = sc;

            // whereami
            sc = new TSOS.ShellCommand(this.shellWhereAmI, "whereami", "- Self-Explanatory... Displays where you are.");
            this.commandList[this.commandList.length] = sc;

            // schrodinger <string>
            sc = new TSOS.ShellCommand(this.shellSchrodinger, "schrodinger", "<look | nolook> - Dead or Alive?.");
            this.commandList[this.commandList.length] = sc;

            //status <string>
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<string> - Allows user to change OS status display.");
            this.commandList[this.commandList.length] = sc;

            //load
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- Allows user to load a program in 6502a op codes via the User Program Input section of the GUI.");
            this.commandList[this.commandList.length] = sc;

            //bsod
            sc = new TSOS.ShellCommand(this.shellBSOD, "bsod", "- Displays blue screen error message that is shown when a kernel error occurs.");
            this.commandList[this.commandList.length] = sc;

            //run <number>
            sc = new TSOS.ShellCommand(this.shellRun, "run", "<number> - Allows user to run a program loaded in memory, specified by Process ID.");
            this.commandList[this.commandList.length] = sc;

            //clearmem
            sc = new TSOS.ShellCommand(this.shellClearMem, "clearmem", "- Clears all segments of memory.");
            this.commandList[this.commandList.length] = sc;

            //runall
            sc = new TSOS.ShellCommand(this.shellRunAll, "runall", "- Runs all currently loaded processes/programs.");
            this.commandList[this.commandList.length] = sc;

            //quantum <number>
            sc = new TSOS.ShellCommand(this.shellQuantum, "quantum", "<number> - Allows user to adjust the quantum used for Round Robin process scheduling.");
            this.commandList[this.commandList.length] = sc;

            //kill <number>
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "<number> - Allows user to terminate a program by passing in the process ID of the program to terminate.");
            this.commandList[this.commandList.length] = sc;

            //killall
            sc = new TSOS.ShellCommand(this.shellKillAll, "killall", "- Allows user to terminate all active processes.");
            this.commandList[this.commandList.length] = sc;

            //ps
            sc = new TSOS.ShellCommand(this.shellPS, "ps", "- Displays all currently active processes.");
            this.commandList[this.commandList.length] = sc;

            // processes - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            //
            // Display the initial prompt.
            this.putPrompt();
        };

        Shell.prototype.putPrompt = function () {
            _StdOut.putText(_PromptStr);
        };

        Shell.prototype.handleInput = function (buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);

            //
            // Parse the input...
            //
            // Add used commands to ordered array for command history recall
            this.commandHistory[this.commandPlacerCount] = buffer;
            this.commandPointer = this.commandPlacerCount;
            this.commandPlacerCount++;

            var userCommand = new TSOS.UserCommand();
            userCommand = this.parseInput(buffer);

            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;

            //
            // Determine the command and execute it.
            //
            // JavaScript may not support associative arrays in all browsers so we have to
            // iterate over the command list in attempt to find a match.  TODO: Is there a better way? Probably.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
                _TabIndex = 0; // Resets tab index variable after execution of a shell command, signifying end of current tabbing for current command
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                } else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };

        // args is an option parameter, ergo the ? which allows TypeScript to understand that
        Shell.prototype.execute = function (fn, args) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();

            // ... call the command function passing in the args...
            fn(args);

            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }

            // ... and finally write the prompt again.
            this.putPrompt();
        };

        Shell.prototype.parseInput = function (buffer) {
            var retVal = new TSOS.UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();

            // 4.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);

            // 4.2 Record it in the return value.
            retVal.command = cmd;

            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };

        //
        // Shell Command Functions.  Again, not part of Shell() class per se', just called from there.
        //
        Shell.prototype.shellInvalidCommand = function () {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Duh. Go back to your Speak & Spell.");
            } else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        };

        Shell.prototype.shellCurse = function () {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        };

        Shell.prototype.shellApology = function () {
            if (_SarcasticMode) {
                _StdOut.putText("Okay. I forgive you. This time.");
                _SarcasticMode = false;
            } else {
                _StdOut.putText("For what?");
            }
        };

        Shell.prototype.shellVer = function (args) {
            _StdOut.putText(APP_NAME + ": version " + APP_VERSION + " \"Latest and Greatest\"");
        };

        Shell.prototype.shellHelp = function (args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        };

        Shell.prototype.shellShutdown = function (args) {
            _StdOut.putText("Shutting down...");

            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        };

        Shell.prototype.shellCls = function (args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        };

        Shell.prototype.shellMan = function (args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            } else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        };

        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, dumbass.");
                        } else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }

                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        };

        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            } else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        };

        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                _PromptStr = args[0];
            } else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        };

        Shell.prototype.shellDate = function () {
            //TODO: Replace current multi-variable time format, possible simplified implementation of date/time formatting that already exists
            var currDate = new Date();
            var currDay = currDate.getDate();
            var currMonth = currDate.getMonth() + 1;
            var currYear = currDate.getFullYear();

            var currTimeHr = currDate.getHours();
            var currTimeMin = currDate.getMinutes();
            var currAMvPM = "AM";

            if (currTimeMin < 10) {
                var currTimeMinStr = "0" + currTimeMin;
            } else {
                var currTimeMinStr = "" + currTimeMin;
            }

            if (currTimeHr === 0) {
                currTimeHr = 12;
            }

            if (currTimeHr > 11) {
                currAMvPM = "PM";
                if (currTimeHr > 12) {
                    currTimeHr = currTimeHr % 12;
                }
            }
            _StdOut.putText(currMonth + "/" + currDay + "/" + currYear + " " + currTimeHr + ":" + currTimeMinStr + " " + currAMvPM);
        };

        Shell.prototype.shellWhereAmI = function () {
            _StdOut.putText("\"PANAMAAAAAAAAAAAA!\" - David Lee Roth");
        };

        Shell.prototype.shellSchrodinger = function (args) {
            if (args[0] === "look") {
                var life = Math.random();

                // Life gets the slightest of an advantage in this duality because, well, I'm an optimist.
                if (life >= .5) {
                    _StdOut.putText("It's ALIVE!!!");
                } else {
                    _StdOut.putText("It's... not so alive.");
                }
            } else if (args[0] === "nolook") {
                _StdOut.putText("Dead/Alive... Look in the box!");
            } else {
                _StdOut.putText("To look or not to look in the box... That is the question.");
            }
        };

        Shell.prototype.shellStatus = function (args) {
            if (args[0].length > 0) {
                _Status = args[0];
            }
        };

        // TODO: Fix load function to stop "enter" key from causing program to think hex code is invalid
        Shell.prototype.shellLoad = function () {
            var programTextElem = document.getElementById("taProgramInput");
            var programStr = programTextElem.value.toString();
            programStr = programStr.replace(/\s/g, "");

            if (programStr.length > 0) {
                var isValidHex = true;
                var textCount = 0;
                if (programStr.length > 0) {
                    while (isValidHex && (textCount < programStr.length)) {
                        var chkChr = programStr.charCodeAt(textCount);
                        if (((chkChr > 47) && (chkChr < 58)) || ((chkChr > 64) && (chkChr < 71)) || ((chkChr > 96) && (chkChr < 103)) || (chkChr === 32)) {
                            textCount++;
                        } else {
                            isValidHex = false;
                        }
                    }
                    if (isValidHex) {
                        _Kernel.memManager.loadMem(_CurrentMemBlock, programStr);
                        var pcb = new TSOS.ProcessControlBlock();
                        _PCBArray[pcb.PID] = pcb;
                        _ResidentPCBList[pcb.PID] = 1;
                        _StdOut.putText("Loaded Program: PID " + pcb.PID);
                        _Kernel.memManager.updateMem();
                    } else {
                        _StdOut.putText("INVALID PROGRAM LOADED: PLEASE LOAD A VALID PROGRAM");
                    }
                } else {
                    _StdOut.putText("NO PROGRAM TO LOAD");
                }
            }
        };

        Shell.prototype.shellBSOD = function () {
            _Console.displayBSOD("This is an example BSOD error message");
        };

        Shell.prototype.shellRun = function (pid) {
            if ((_ResidentPCBList[pid] === 1) || (_ResidentPCBList[pid] === 2) || (_ResidentPCBList[pid] === 3)) {
                //_StdOut.putText("pcb found");
                _CPU.loadCPU(_PCBArray[pid]);
                _ActiveProgramExists = true;

                //_StdOut.putText("CPU loaded");
                _CPU.isExecuting = true;
            } else {
                _StdOut.putText("Program referenced is not loaded, please load the program or reference a valid PID");
            }
        };

        Shell.prototype.shellClearMem = function () {
            _MemoryArray.clearMem();
        };

        Shell.prototype.shellQuantum = function (q) {
            _Quantum = q;
        };

        Shell.prototype.shellKill = function (pid) {
            if (_CPU.currentPID === pid) {
                _ProcessScheduler.contextSwitchDrop();
            } else if ((_ResidentPCBList[pid] !== 1) && (_ResidentPCBList[pid] !== 2) && (_ResidentPCBList[pid] !== 3)) {
                _StdOut.putText("Invalid Process ID specified in kill command...");
            } else {
                for (var k = 0; k < _ReadyQueue.getSize(); k++) {
                    var pcb = _ReadyQueue.q[k];
                    if (pcb.PID === pid) {
                        _ReadyQueue.q.splice(k, 1);
                    }
                }
            }
        };

        Shell.prototype.shellKillAll = function () {
            _CPU.isExecuting = false;
            _ReadyQueue.clearQueue();
        };

        Shell.prototype.shellRunAll = function () {
            for (var j = 0; j < _ResidentPCBList.length; j++) {
                if ((_ResidentPCBList[j] === 1) || (_ResidentPCBList[j] === 2) || (_ResidentPCBList[j] === 3)) {
                    _ReadyQueue.enqueue(_PCBArray[j]);
                }
            }

            _CPU.isExecuting = true;
        };

        Shell.prototype.shellPS = function () {
            if (_CPU.isExecuting || _ActiveProgramExists) {
                _StdOut.putText("Current Process Running: " + _CPU.currentPID);
                _StdOut.purText("Active Processes: ");

                for (var i = 0; i < _ReadyQueue.getSize(); i++) {
                    var pcb = _ReadyQueue.q[i];
                    _StdOut.putText(pcb.PID);
                }
            }
        };
        return Shell;
    })();
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
