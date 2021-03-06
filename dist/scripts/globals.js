/* ------------
Globals.ts
Global CONSTANTS and _Variables.
(Global over both the OS and Hardware Simulation / Host.)
This code references page numbers in the text book:
Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
------------ */
//
// Global "CONSTANTS" (There is currently no const or final or readonly type annotation in TypeScript.)
// TODO: Make a global object and use that instead of the "_" naming convention in the global namespace.
//
var APP_NAME = "FigOS";
var APP_VERSION = "1.0";

var CPU_CLOCK_INTERVAL = 100;

var TIMER_IRQ = 0;

// NOTE: The timer is different from hardware/host clock pulses. Don't confuse these.
var KEYBOARD_IRQ = 1;

var TIMER_KILL_ACTIVE_IRQ = 2;

var USER_PROCESS_KILL_IRQ = 3;

//
// Global Variables
//
var _CPU;
var _PCBArray;

var _Display;

var _MemLoadedTable;

var _OSclock = 0;

var _Mode = 0;

var _Canvas = null;
var _DrawingContext = null;
var _DefaultFontFamily = "sans";
var _DefaultFontSize = 13;
var _FontHeightMargin = 4;

var _Trace = true;

// The OS Kernel and its queues.
var _Kernel;
var _KernelInterruptQueue = null;
var _KernelBuffers = null;
var _KernelInputQueue = null;

// Standard input and output
var _StdIn = null;
var _StdOut = null;

// UI
var _Console;
var _OsShell;

// At least this OS is not trying to kill you. (Yet.)
var _SarcasticMode = false;

// Global Device Driver Objects - page 12
var _krnKeyboardDriver = null;
var _krnHDDDriver = null;

var _hardwareClockID = null;

// For testing...
var _GLaDOS = null;
var Glados = null;

var onDocumentLoad = function () {
    TSOS.Control.hostInit();
};

// TODO: Find alternatives to global variable usage if at all possible for the following variables:
var _Status = "good";
var _TabIndex = 0;
var _PromptStr = ">";

var _MemSize = 768;
var _MemBlockSize = 256;
var _CurrentMemBlock = 0;
var _PIDAssign = 0;
var _MemoryArray;

var _SingleStepActive = false;
var _NextClicked = false;
var _ActiveProgramExists = false;
var _PrevPC = 0;

var _ResidentPCBList;
var _ReadyQueue;
var _ProcessScheduler;

var _TerminatedProcessList;

var _Quantum = 6;

var _HDD;
var _SwapFileCounter = 1;
var _TempSwapFileData = "";
