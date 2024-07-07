import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const bubbleSortAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  _args
) => {
  const nodeArray = structure as NodeArray;

  bubbleSort(canvas, nodeArray);
};

function bubbleSort(canvas: Canvas, array: NodeArray) {
  const arrayString = array.array.map(node => node.value).toString();
  canvas.pushStack(`bubbleSort(array=[${arrayString}])`);
  canvas.pushStep([0]);

  let sorted = false;
  canvas.pushStep([1]);

  canvas.pushStep([3]);
  while (!sorted) {
    sorted = true;
    canvas.pushStep([4]);

    canvas.pushStep([6]);
    for (let i = 1; i < array.array.length; i++) {
      array.array[i].color = Color.Primary;
      array.array[i - 1].color = Color.Secondary;
      canvas.pushStep([7]);
      if (array.array[i - 1].value > array.array[i].value) {
        // swap array[i - 1] and array[i]
        [array.array[i - 1].value, array.array[i].value] = [
          array.array[i].value,
          array.array[i - 1].value,
        ];
        canvas.pushStep([9]);

        sorted = false;
        canvas.pushStep([11]);
      }

      canvas.pushStep([6]);
      array.array[i].color = Color.Transparent;
      array.array[i - 1].color = Color.Transparent;
    }

    canvas.pushStep([3]);
  }

  for (const node of array.array) node.color = Color.Success;
  canvas.pushStep([16]);
  for (const node of array.array) node.color = Color.Transparent;
  canvas.pushStep([17]);
  return;
}

export const bubbleSortCode = `function bubbleSort(array) {
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        // swap array[i - 1] and array[i]
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        
        sorted = false;
      }
    }
  }

  return;
}`;

export default bubbleSortAlgorithmFunction;
