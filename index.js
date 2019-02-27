const queue = require('./Queue');

const q = queue.createQueue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log(q.peek());
console.log(q.length);
console.log(q.dequeue(), q.items, q.dequeue());