var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TSOS;
(function (TSOS) {
    var LazyPriorityQueue = (function (_super) {
        __extends(LazyPriorityQueue, _super);
        function LazyPriorityQueue() {
            _super.apply(this, arguments);
        }
        //TODO: Apologize for this inefficient implementation of a PriorityQueue and implement an actual tree structure rather than a linear queue
        LazyPriorityQueue.prototype.dequeue = function () {
            var maxPriority;
            maxPriority = this.q[0];
            var index = 0;

            for (var i = 1; i < this.getSize(); i++) {
                var tempPCB = this.q[i];
                if (maxPriority.priority > tempPCB.priority) {
                    maxPriority = tempPCB;
                    index = i;
                }
            }

            this.q.splice(index);
            return maxPriority;
        };
        return LazyPriorityQueue;
    })(TSOS.Queue);
    TSOS.LazyPriorityQueue = LazyPriorityQueue;
})(TSOS || (TSOS = {}));
