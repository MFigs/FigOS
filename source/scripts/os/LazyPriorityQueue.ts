module TSOS {

    export class LazyPriorityQueue extends TSOS.Queue {

        //TODO: Apologize for this inefficient implementation of a PriorityQueue and implement an actual tree structure rather than a linear queue

        public dequeue() {

            var maxPriority: TSOS.ProcessControlBlock;
            maxPriority = this.q[0];
            var index: number = 0;

            for(var i = 1; i < this.getSize(); i++) {
                var tempPCB: TSOS.ProcessControlBlock = this.q[i];
                if (maxPriority.priority > tempPCB.priority) {
                    maxPriority = tempPCB;
                    index = i;
                }
            }

            this.q.splice(index);
            return maxPriority;

        }

    }

}