import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const binarySearchAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const nodeArray = structure as NodeArray;
  const target = args.target as number;

  binarySearch(canvas, nodeArray, target);
};

function binarySearch(canvas: Canvas, array: NodeArray, target: number) {
  const arrayString = array.array.map(node => node.value).toString();
  canvas.pushStack(`binarySearch(array=[${arrayString}], target=${target})`);
  canvas.pushStep([0]);

  let start = 0;
  let end = array.array.length;
  canvas.pushStep([1, 2]);

  canvas.pushStep([4]);
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    array.array[mid].color = Color.Primary;
    canvas.pushStep([5]);

    canvas.pushStep([7]);
    if (array.array[mid].value === target) {
      for (const node of array.array) node.color = Color.Transparent;
      array.array[mid].color = Color.Success;
      canvas.pushStep([8]);

      for (const node of array.array) node.color = Color.Transparent;
      canvas.pushStep([17]);
      return;
    } else if (array.array[mid].value < target) {
      canvas.pushStep([9]);

      for (let i = start; i <= mid; i++) array.array[i].color = Color.Error;
      canvas.pushStep([12]);
      start = mid + 1;
    } else {
      for (let i = mid; i < end; i++) array.array[i].color = Color.Error;
      canvas.pushStep([10]);
      end = mid;
    }

    canvas.pushStep([4]);
  }

  for (const node of array.array) node.color = Color.Error;
  canvas.pushStep([16]);
  for (const node of array.array) node.color = Color.Transparent;
  canvas.pushStep([17]);
  return;
}

export const binarySearchCode = `function binarySearch(array, target) {
  let start = 0;
  let end = array.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  
  return null;
}`;

export default binarySearchAlgorithmFunction;
