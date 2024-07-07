import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const insertionSortAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  _args
) => {
  const nodeArray = structure as NodeArray;

  insertionSort(canvas, nodeArray);
};

function insertionSort(canvas: Canvas, array: NodeArray) {
  const arrayString = array.array.map(node => node.value).toString();
  canvas.pushStack(`bubbleSort(array=[${arrayString}])`);
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  for (let i = 1; i < array.array.length; i++) {
    array.array[i].color = Color.Primary;
    canvas.pushStep([2]);
    for (let j = i; j > 0; j--) {
      array.array[j].color = Color.Primary;
      array.array[j - 1].color = Color.Secondary;
      canvas.pushStep([3]);
      if (array.array[j - 1].value > array.array[j].value) {
        // swap array[j - 1] and array[j]
        [array.array[j - 1].value, array.array[j].value] = [
          array.array[j].value,
          array.array[j - 1].value,
        ];
        array.array[j].color = Color.Secondary;
        array.array[j - 1].color = Color.Primary;
        canvas.pushStep([5]);
      } else {
        canvas.pushStep([7]);
        array.array[j].color = Color.Success;
        array.array[j - 1].color = Color.Success;
        break;
      }

      canvas.pushStep([2]);
      array.array[j].color = Color.Success;
      array.array[j - 1].color = Color.Success;
    }

    canvas.pushStep([1]);
  }

  for (const node of array.array) node.color = Color.Success;
  canvas.pushStep([12]);
  for (const node of array.array) node.color = Color.Transparent;
  canvas.pushStep([13]);
  return;
}

export const insertionSortCode = `function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j - 1] > array[j]) {
        // swap array[j - 1] and array[j]
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
      } else {
        break;
      }
    }
  }

  return;
}`;

export default insertionSortAlgorithmFunction;
