/* Typical comparison function */
const defaultCompare = (a, b) =>
  a > b ? 1 : (a < b ? -1 : 0);

/* Version 1:
 O(n)
 Fixed memory
 Loops
 */
const binarySearchWithLoops = (array, element, compare = defaultCompare) => {
  let startIndex = 0;
  let endIndex = array.length - 1;

  while (startIndex <= endIndex) {
    let pivot = Math.floor((startIndex + endIndex) / 2);

    switch (compare(element, array[pivot])) {
      case -1: {
        endIndex = pivot - 1;
        break;
      }
      case 1: {
        startIndex = pivot + 1;
        break;
      }
      default:
        return pivot;
    }
  }

  return -1;
};

const binarySearchWithRecursion = (array, element, compare = defaultCompare, start = 0, end = array.length - 1) => {
  if (start > end) {
    return -1;
  }

  const middle = Math.floor((start + end) / 2);
  const comparison = compare(element, array[middle]);

  if (comparison === 0) {
    return middle;
  }

  const newBounds = comparison === -1
    ? [start, middle - 1]
    : [middle + 1, end];

  return binarySearchWithRecursion(array, element, compare, ...newBounds);
};

const binarySearchWithArraySplitting = (array, element, compare = defaultCompare) => {
  if (array.length === 0) {
    return -1;
  }

  const middle = Math.floor(array.length / 2);
  const comparison = compare(element, array.get(middle));

  if (comparison === 0) {
    return middle;
  }

  const [left, right] = comparison === -1
    ? [0, middle - 1]
    : [middle + 1, array.length];

  const subIndex = binarySearchWithArraySplitting(array.slice(left, right), element);

  return subIndex === -1
    ? -1
    : left + subIndex;
};

export const ArrayView = (
  array,
  start = 0,
  end = array.length
) => ({
  start,
  length: end - start,
  toArray: () => array.slice(start, end),
  slice: (dStart, dEnd) => ArrayView(array, start + dStart, start + dEnd),
  get: (index) => {
    let realIndex = start + index;
    return realIndex < end && realIndex >= start
      ? array[realIndex]
      : undefined;
  }
});

const binarySearchWithArrayView = (array, ...args) =>
  binarySearchWithArraySplitting(ArrayView(array), ...args)

export const ArrayPartition = (
  array,
  pivot,
) => ({
  left: () => array.slice(0, pivot),
  middle: () => array.get(pivot),
  right: () => array.slice(pivot + 1, array.length),
});

let binarySearchWithPartition = (array, element, compare = defaultCompare) => {
  if (array.length === 0) { return -1; }
  const middle = Math.floor(array.length / 2);
  const part = ArrayPartition(array, middle);
  const comparison = compare(element, part.middle());

  return comparison === 0
  ? array.start + middle
    : binarySearchWithPartition(comparison === -1 ? part.left() : part.right(), element, compare);
};

let binarySearchWithPartitionAndView = (array, ...args) =>
  binarySearchWithPartition(ArrayView(array), ...args);

export default binarySearchWithPartitionAndView;
