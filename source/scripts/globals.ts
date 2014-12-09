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
var APP_NAME: string    = "FigOS";
var APP_VERSION: string = "1.0";

var CPU_CLOCK_INTERVAL: number = 100;   // This is in ms, or milliseconds, so 1000 = 1 second.

var TIMER_IRQ: number = 0;  // Pages 23 (timer), 9 (interrupts), and 561 (interrupt priority).
                            // NOTE: The timer is different from hardware/host clock pulses. Don't confuse these.
var KEYBOARD_IRQ: number = 1;

var TIMER_KILL_ACTIVE_IRQ: number = 2;

var USER_PROCESS_KILL_IRQ: number = 3;


//
// Global Variables
//
var _CPU: TSOS.Cpu;  // Utilize TypeScript's type annotation system to ensure that _CPU is an instance of the Cpu class.
var _PCBArray: TSOS.ProcessControlBlock[];

var _Display: TSOS.Display;

var _MemLoadedTable: number[];

var _OSclock: number = 0;  // Page 23.

var _Mode: number = 0;     // (currently unused)  0 = Kernel Mode, 1 = User Mode.  See page 21.

var _Canvas: HTMLCanvasElement = null;  // Initialized in hostInit().
var _DrawingContext = null;             // Initialized in hostInit().
var _DefaultFontFamily = "sans";        // Ignored, I think. The was just a place-holder in 2008, but the HTML canvas may have use for it.
var _DefaultFontSize = 13;
var _FontHeightMargin = 4;              // Additional space added to font size when advancing a line.


var _Trace: boolean = true;  // Default the OS trace to be on.

// The OS Kernel and its queues.
var _Kernel: TSOS.Kernel;
var _KernelInterruptQueue = null;
var _KernelBuffers: any[] = null;
var _KernelInputQueue = null;

// Standard input and output
var _StdIn  = null;
var _StdOut = null;

// UI
var _Console: TSOS.Console;
var _OsShell: TSOS.Shell;

// At least this OS is not trying to kill you. (Yet.)
var _SarcasticMode: boolean = false;

// Global Device Driver Objects - page 12
var _krnKeyboardDriver = null;
var _krnHDDDriver = null;

var _hardwareClockID: number = null;

// For testing...
var _GLaDOS: any = null;
var Glados: any = null;

var onDocumentLoad = function() {
	TSOS.Control.hostInit();
};

// TODO: Find alternatives to global variable usage if at all possible for the following variables:

var _Status = "good"; // Global variable for shell status command changes and access via console
var _TabIndex = 0;    // Global variable for search index persistence throughout various calls to tab completion
var _PromptStr = ">"; // Global prompt variable that addresses issues in _OsShell.putPrompt() functionality in other files

var _MemSize = 768; // Memory Size in bytes
var _MemBlockSize = 256;
var _CurrentMemBlock = 0;
var _PIDAssign = 0;
var _MemoryArray: TSOS.Memory;

var _SingleStepActive: boolean = false;
var _NextClicked: boolean = false;
var _ActiveProgramExists: boolean = false;
var _PrevPC: number = 0;

var _ResidentPCBList: number[];
var _ReadyQueue: TSOS.Queue;
var _ProcessScheduler: TSOS.ProcessScheduler;

var _TerminatedProcessList: number[];

var _Quantum: number = 6;

var _HDD: TSOS.HardDrive;
var _SwapFileCounter: number = 1;
var _TempSwapFileData: string = "";
