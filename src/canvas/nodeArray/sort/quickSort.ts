import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const quickSortAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  _args
) => {
  const nodeArray = structure as NodeArray;

  quickSort(canvas, nodeArray, 0, nodeArray.array.length);
};

function quickSort(
  canvas: Canvas,
  array: NodeArray,
  start: number,
  end: number
) {
  const arrayString = array.array.map(node => node.value).toString();
  canvas.pushStack(
    `quickSort(array=[${arrayString}], start=${start}, end=${end})`
  );
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  if (start >= end) {
    canvas.pushStep([2]);
    canvas.pushStep([28]);
    return;
  }

  const pivotIndex = end - 1;
  const pivotValue = array.array[pivotIndex].value;
  array.array[pivotIndex].color = Color.Primary;
  canvas.pushStep([5, 6]);

  let position = start - 1;
  canvas.pushStep([8]);

  canvas.pushStep([10]);
  for (let j = start; j < pivotIndex; j++) {
    array.array[j].color = Color.Primary;
    canvas.pushStep([11]);
    if (array.array[j].value < pivotValue) {
      if (position >= start && array.array[position])
        array.array[position].color = Color.Transparent;
      position++;
      array.array[position].color = Color.Secondary;
      canvas.pushStep([12]);

      // swap array[position] and array[j]
      [array.array[position].value, array.array[j].value] = [
        array.array[j].value,
        array.array[position].value,
      ];
      canvas.pushStep([15]);
    }

    if (j !== position) array.array[j].color = Color.Transparent;
    canvas.pushStep([10]);
  }

  if (position >= start && array.array[position])
    array.array[position].color = Color.Transparent;
  position++;
  array.array[position].color = Color.Secondary;
  canvas.pushStep([19]);

  // swap array[position] and array[pivotIndex]
  [array.array[position].value, array.array[pivotIndex].value] = [
    array.array[pivotIndex].value,
    array.array[position].value,
  ];
  canvas.pushStep([22]);
  array.array[pivotIndex].color = Color.Transparent;
  array.array[position].color = Color.Success;

  canvas.pushStep([24]);
  quickSort(canvas, array, start, position);
  canvas.popStack();

  canvas.pushStep([25]);
  quickSort(canvas, array, position + 1, end);
  canvas.popStack();

  canvas.pushStep([27]);
  if (start === 0 && end === array.array.length)
    for (const node of array.array) node.color = Color.Transparent;
  canvas.pushStep([28]);
  return;
}

export const quickSortCode = `function quickSort(array, start, end) {
  if (start >= end) {
    return;
  }

  const pivotIndex = end - 1;
  const pivotValue = array[pivotIndex];

  let position = start - 1;

  for (let j = start; j < pivotIndex; j++) {
    if (array[j] < pivotValue) {
      position++;

      // swap array[position] and array[j]
      [array[position], array[j]] = [array[j], array[position]];
    }
  }

  position++;

  // swap array[pivotIndex] and array[position];
  [array[position], array[j]] = [array[j], array[position]];

  quickSort(array, start, position);
  quickSort(array, position + 1, end);

  return;
}`;

export default quickSortAlgorithmFunction;
