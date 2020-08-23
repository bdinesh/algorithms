import binarySearch, { ArrayView, ArrayPartition } from './binary-search.js';
import { deepStrictEqual } from 'assert';

let view = ArrayView([1,2,3,7]);

deepStrictEqual(view.toArray(), [1,2,3,7]);
deepStrictEqual(ArrayView([1,2,3,7], 1).toArray(), [2,3,7]);
deepStrictEqual(ArrayView([1,2,3,7], 1, 3).toArray(), [2,3]);
deepStrictEqual(view.slice(1, 3).toArray(), [2,3]);
deepStrictEqual(view.slice(1, 4).slice(0, 2).toArray(), [2,3]);

deepStrictEqual(view.get(0), 1);
deepStrictEqual(view.get(3), 7);
deepStrictEqual(view.get(-1), undefined);
deepStrictEqual(view.get(4), undefined);

deepStrictEqual(view.slice(1, 4).get(0), 2);
deepStrictEqual(view.slice(1, 4).get(2), 7);
deepStrictEqual(view.slice(1, 4).get(-1), undefined);
deepStrictEqual(view.slice(1, 4).get(3), undefined);

let part = ArrayPartition(view, 2);
deepStrictEqual(part.left().toArray(), [1,2]);
deepStrictEqual(part.middle(), 3);
deepStrictEqual(part.right().toArray(), [7]);

deepStrictEqual(binarySearch([], 2), -1);
deepStrictEqual(binarySearch([1], 1), 0);
deepStrictEqual(binarySearch([1], 2), -1);
deepStrictEqual(binarySearch([1,2,3], 2), 1);
deepStrictEqual(binarySearch([1,2,3], 3), 2);
deepStrictEqual(binarySearch([1,2,3], 4), -1);
deepStrictEqual(binarySearch([1,2,3,7], 3), 2);
