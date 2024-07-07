import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const selectionSortAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  _args
) => {
  const nodeArray = structure as NodeArray;

  selectionSort(canvas, nodeArray);
};

function selectionSort(canvas: Canvas, array: NodeArray) {
  const arrayString = array.array.map(node => node.value).toString();
  canvas.pushStack(`selectionSort(array=[${arrayString}])`);
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.Primary;
    canvas.pushStep([2]);
    for (let j = i + 1; j < array.array.length; j++) {
      array.array[j].color = Color.Secondary;
      canvas.pushStep([3]);
      if (array.array[i].value > array.array[j].value) {
        // swap array[i] and array[j]
        [array.array[i].value, array.array[j].value] = [
          array.array[j].value,
          array.array[i].value,
        ];
        canvas.pushStep([5]);
      }

      canvas.pushStep([2]);
      array.array[j].color = Color.Transparent;
    }

    canvas.pushStep([1]);
    array.array[i].color = Color.Success;
  }

  for (const node of array.array) node.color = Color.Success;
  canvas.pushStep([10]);
  for (const node of array.array) node.color = Color.Transparent;
  canvas.pushStep([11]);
  return;
}

export const selectionSortCode = `function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        // swap array[j - 1] and array[j]
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
      }
    }
  }

  return;
}`;

export default selectionSortAlgorithmFunction;
