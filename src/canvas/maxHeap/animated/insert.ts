import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import MaxHeap, {MaxHeapNode} from '../index.js';

const insertAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const heap = structure as MaxHeap;
  const value = args.value as number;

  insert(canvas, heap, value);
};

function insert(canvas: Canvas, heap: MaxHeap, value: number) {
  canvas.pushStack(`insert(heap, value=${value})`);
  canvas.pushStep([0]);

  const node = new MaxHeapNode(value);
  node.opacity = 0;
  canvas.addStructure(node);
  node.color = Color.Success;

  const nodeIndex = heap.array.length;
  if (nodeIndex !== 0) {
    const parentIndex = Math.floor((nodeIndex - 1) / 2);
    const parent = heap.array[parentIndex];

    const leftIndex = parentIndex * 2 + 1;
    const rightIndex = parentIndex * 2 + 2;

    if (nodeIndex === leftIndex) {
      parent.leftEdgePercent = 0;
    } else if (nodeIndex === rightIndex) {
      parent.rightEdgePercent = 0;
    }

    canvas.removeStructure(node);
    heap.array.push(node);
    heap.rearrange();
    node.fadeIn(canvas);

    if (nodeIndex === leftIndex) {
      parent.growLeftEdge(canvas);
    } else if (nodeIndex === rightIndex) {
      parent.growRightEdge(canvas);
    }
  } else {
    canvas.removeStructure(node);
    heap.array.push(node);
    heap.rearrange();
    node.fadeIn(canvas);
  }
  canvas.pushStep([1]);

  let position = heap.array.length - 1;
  heap.array[position].color = Color.Primary;
  canvas.pushStep([3]);

  canvas.pushStep([5]);
  while (position !== 0) {
    const parentIndex = Math.floor((position - 1) / 2);
    const parent = heap.array[parentIndex];
    parent.color = Color.Secondary;
    canvas.pushStep([6, 7]);

    canvas.pushStep([9]);
    if (parent.value < node.value) {
      [heap.array[position].value, heap.array[parentIndex].value] = [
        heap.array[parentIndex].value,
        heap.array[position].value,
      ];
      canvas.pushStep([11, 12]);
    } else {
      canvas.pushStep([14]);
      heap.array[parentIndex].color = Color.Transparent;
      break;
    }

    heap.array[position].color = Color.Transparent;
    heap.array[parentIndex].color = Color.Transparent;
    position = parentIndex;
    heap.array[position].color = Color.Primary;
    canvas.pushStep([17]);

    canvas.pushStep([5]);
  }

  heap.array[position].color = Color.Success;
  canvas.pushStep([20]);

  heap.array[position].color = Color.Transparent;
  canvas.pushStep([21]);
  return;
}

export const insertCode = `function insert(heap, value) {
  heap.array.push(value);

  let position = heap.array.length - 1;

  while (position !== 0) {
    const parentIndex = Math.floor((position - 1) / 2);
    const parent = heap.array[parentIndex];

    if (parent < value) {
      // swap values at position and parent
      [heap.array[position], heap.array[parentIndex]] = 
        [heap.array[parentIndex], heap.array[position]];
    } else {
       break;
    }

    position = parentIndex;
  }

  return;
}`;

export default insertAlgorithmFunction;
