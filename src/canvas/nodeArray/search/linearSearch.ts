import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const linearSearchAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const nodeArray = structure as NodeArray;
  const target = args.target as number;

  linearSearch(canvas, nodeArray, target);
};

function linearSearch(canvas: Canvas, array: NodeArray, target: number) {
  const arrayString = array.array.map(node => node.value).toString();
  canvas.pushStack(`linearSearch(array=[${arrayString}], target=${target})`);
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.Primary;
    canvas.pushStep([2]);
    if (array.array[i].value === target) {
      array.array[i].color = Color.Success;
      canvas.pushStep([3]);
      array.array[i].color = Color.Transparent;
      canvas.pushStep([8]);
      return;
    }

    array.array[i].color = Color.Transparent;
    canvas.pushStep([1]);
  }

  for (const node of array.array) node.color = Color.Error;
  canvas.pushStep([7]);
  for (const node of array.array) node.color = Color.Transparent;
  canvas.pushStep([8]);
  return;
}

export const linearSearchCode = `function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return array[i];
    }
  }

  return null;
}`;

export default linearSearchAlgorithmFunction;
