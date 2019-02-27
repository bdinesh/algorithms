const assert = require('chai').assert;
const queue = require('../Queue');

describe('Queue', function () {
    describe('enqueue()', function () {
        it('should add an item to the start of the queue', function () {
            const q = queue.createQueue();
            q.enqueue(1);
            q.enqueue(2);
            assert.equal(q.items.indexOf(1), 1);
            assert.equal(q.items.indexOf(2), 0);
        });
    });
});