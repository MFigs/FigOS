module TSOS {

    export class ProcessScheduler {

        // Process Scheduling Algorithms:
        // 0: Round Robin

        public scheduleAlgorithm: number = 0;

        constructor() {

        }

        public contextSwitch() {

        }

        public contextSwitchDrop() {

            _CPU.loadCPU(_ReadyQueue.dequeue());

        }

    }

}