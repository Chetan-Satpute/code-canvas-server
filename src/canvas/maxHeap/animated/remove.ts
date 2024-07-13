import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import MaxHeap, {MaxHeapNode} from '../index.js';

const removeAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  _args
) => {
  const heap = structure as MaxHeap;

  remove(canvas, heap);
};

function remove(canvas: Canvas, heap: MaxHeap) {
  canvas.pushStack('remove(heap)');
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  if (heap.array.length === 0) {
    canvas.pushStep([2]);
    canvas.pushStep([49]);
    return;
  }

  canvas.pushStep([5]);
  if (heap.array.length === 1) {
    const node = heap.array[0];
    node.color = Color.Error;
    node.fadeOut(canvas);
    heap.array.pop();
    heap.rearrange();
    canvas.pushStep([6]);
    canvas.pushStep([7]);
    canvas.pushStep([49]);
    return;
  }

  heap.array[0].color = Color.Primary;
  heap.array[heap.array.length - 1].color = Color.Secondary;
  [heap.array[0].value, heap.array[heap.array.length - 1].value] = [
    heap.array[heap.array.length - 1].value,
    heap.array[0].value,
  ];
  canvas.pushStep([11, 12]);

  heap.array[heap.array.length - 1].color = Color.Error;
  {
    const nodeIndex = heap.array.length - 1;
    const parentIndex = Math.floor((nodeIndex - 1) / 2);

    const leftIndex = parentIndex * 2 + 1;
    const rightIndex = parentIndex * 2 + 2;

    if (leftIndex === nodeIndex) {
      heap.array[parentIndex].shrinkLeftEdge(canvas);
    }

    if (rightIndex === nodeIndex) {
      heap.array[parentIndex].shrinkRightEdge(canvas);
    }
  }
  heap.array[heap.array.length - 1].fadeOut(canvas);
  const positionIndexMap = heap.getPositionIndexMap();
  const nodePosition = positionIndexMap.findIndex(
    v => v === heap.array.length - 1
  );

  console.log(positionIndexMap, nodePosition);
  for (let x = 0; x < MaxHeapNode.WIDTH; x++) {
    for (let i = nodePosition; i < heap.array.length; i++) {
      heap.array[positionIndexMap[i]].treeX -= 1;
    }

    canvas.pushFrame();
  }
  heap.array.pop();
  heap.rearrange();
  canvas.pushStep([14]);

  let position = 0;
  heap.array[position].color = Color.Primary;
  canvas.pushStep([16]);

  canvas.pushStep([17]);
  while (position < heap.array.length) {
    const leftIndex = position * 2 + 1;
    const rightIndex = position * 2 + 2;
    canvas.pushStep([18, 19]);

    let largestIndex = position;
    canvas.pushStep([21]);

    canvas.pushStep([23, 24, 25, 26]);
    if (
      leftIndex < heap.array.length &&
      heap.array[leftIndex].value > heap.array[largestIndex].value
    ) {
      largestIndex = leftIndex;
      heap.array[largestIndex].color = Color.Secondary;
      canvas.pushStep([27]);
    }

    canvas.pushStep([30, 31, 32, 33]);
    if (
      rightIndex < heap.array.length &&
      heap.array[rightIndex].value > heap.array[largestIndex].value
    ) {
      if (largestIndex !== position)
        heap.array[largestIndex].color = Color.Transparent;
      largestIndex = rightIndex;
      heap.array[largestIndex].color = Color.Secondary;
      canvas.pushStep([34]);
    }

    canvas.pushStep([37]);
    if (largestIndex !== position) {
      [heap.array[largestIndex].value, heap.array[position].value] = [
        heap.array[position].value,
        heap.array[largestIndex].value,
      ];
      canvas.pushStep([39, 40]);
    } else {
      canvas.pushStep([42]);
      break;
    }

    heap.array[largestIndex].color = Color.Transparent;
    heap.array[position].color = Color.Transparent;
    position = largestIndex;
    heap.array[position].color = Color.Primary;
    canvas.pushStep([45]);

    canvas.pushStep([17]);
  }

  heap.array[position].color = Color.Transparent;
  canvas.pushStep([48]);
  canvas.pushStep([49]);
  return;
}

export const removeCode = `function remove(heap) {
  if (heap.array.length === 0) {
    return;
  }

  if (heap.array.length === 1) {
    heap.array.pop();
    return;
  }

  // swap top and last node
  [heap.array[0], heap.array[heap.array.length - 1]] = 
    [heap.array[heap.array.length - 1], heap.array[0]];

  heap.array.pop();

  const position = 0;
  while (position < heap.array.length) {
    const leftIndex = (position * 2) + 1;
    const rightIndex = (position * 2) + 2;

    let largestIndex = position;

    if (
      leftIndex < heap.array.length && 
      heap.array[leftIndex] > heap.array[largestIndex]
    ) {
      largestIndex = leftIndex;
    }

    if (
      rightIndex < heap.array.length && 
      heap.array[rightIndex] > heap.array[largestIndex]
    ) {
      largestIndex = rightIndex;
    }

    if (largestIndex !== position) {
      // swap largest and position
      [heap.array[largestIndex], heap.array[position]] = 
        [heap.array[position], heap.array[largestIndex]];
    } else {
      break;
    }

    position = largestIndex;
  }

  return;
}`;

export default removeAlgorithmFunction;
