import {Color} from '../../color.js';
import Canvas from '../../index.js';
import Node from '../../node/index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const mergeSortAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  _args
) => {
  const nodeArray = structure as NodeArray;

  mergeSort(canvas, nodeArray);
};

function mergeSort(canvas: Canvas, array: NodeArray) {
  const arrayString = array.array.map(node => node.value).toString();
  canvas.pushStack(`merge(array=[${arrayString}])`);
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  if (array.array.length <= 1) {
    for (const node of array.array) node.color = Color.Success;
    canvas.pushStep([2]);
    for (const node of array.array) node.color = Color.Transparent;
    canvas.pushStep([24]);
    return;
  }

  const mid = Math.floor(array.array.length / 2);
  canvas.pushStep([5]);

  const left = new NodeArray();
  const right = new NodeArray();
  left.moveTo(array.x, array.y + Node.HEIGHT * 2);
  right.moveTo(array.x + Node.WIDTH * mid, array.y + Node.HEIGHT * 2);
  canvas.addStructure(left);
  canvas.addStructure(right);
  canvas.pushStep([7, 8]);

  canvas.pushStep([10]);
  for (let i = 0; i < mid; i++) {
    left.array.push(new Node(array.array[i].value));
    left.rearrange();
    canvas.pushStep([11]);
    canvas.pushStep([10]);
  }

  canvas.pushStep([14]);
  for (let i = mid; i < array.array.length; i++) {
    right.array.push(new Node(array.array[i].value));
    right.rearrange();
    canvas.pushStep([15]);
    canvas.pushStep([14]);
  }

  canvas.pushStep([18]);
  mergeSort(canvas, left);
  canvas.popStack();

  canvas.pushStep([19]);
  mergeSort(canvas, right);
  canvas.popStack();

  canvas.pushStep([21]);
  merge(canvas, array, left, right);
  canvas.popStack();

  canvas.removeStructure(left);
  canvas.removeStructure(right);

  for (const node of array.array) node.color = Color.Success;
  canvas.pushStep([23]);
  for (const node of array.array) node.color = Color.Transparent;
  canvas.pushStep([24]);
  return;
}

function merge(
  canvas: Canvas,
  array: NodeArray,
  left: NodeArray,
  right: NodeArray
) {
  const arrayString = array.array.map(node => node.value).toString();
  const leftString = left.array.map(node => node.value).toString();
  const rightString = right.array.map(node => node.value).toString();
  canvas.pushStack(
    `merge(array=[${arrayString}], left=[${leftString}], right=[${rightString}]])`
  );
  canvas.pushStep([26]);

  let arrayIndex = 0;
  if (array.array[arrayIndex]) array.array[arrayIndex].color = Color.Primary;
  canvas.pushStep([27]);

  let leftIndex = 0;
  let rightIndex = 0;
  if (left.array[leftIndex]) left.array[leftIndex].color = Color.Secondary;
  if (right.array[rightIndex]) right.array[rightIndex].color = Color.Secondary;
  canvas.pushStep([29, 30]);

  canvas.pushStep([32]);
  while (leftIndex < left.array.length && rightIndex < right.array.length) {
    canvas.pushStep([33]);
    if (left.array[leftIndex].value < right.array[rightIndex].value) {
      array.array[arrayIndex].value = left.array[leftIndex].value;
      canvas.pushStep([34]);

      array.array[arrayIndex].color = Color.Transparent;
      left.array[leftIndex].color = Color.Transparent;
      arrayIndex++, leftIndex++;
      if (array.array[arrayIndex])
        array.array[arrayIndex].color = Color.Primary;
      if (left.array[leftIndex]) left.array[leftIndex].color = Color.Secondary;
      canvas.pushStep([35]);
    } else {
      array.array[arrayIndex].value = right.array[rightIndex].value;
      canvas.pushStep([37]);

      array.array[arrayIndex].color = Color.Transparent;
      right.array[rightIndex].color = Color.Transparent;
      arrayIndex++, rightIndex++;
      if (array.array[arrayIndex])
        array.array[arrayIndex].color = Color.Primary;
      if (right.array[rightIndex])
        right.array[rightIndex].color = Color.Secondary;
      canvas.pushStep([38]);
    }

    canvas.pushStep([32]);
  }

  canvas.pushStep([42]);
  while (leftIndex < left.array.length) {
    array.array[arrayIndex].value = left.array[leftIndex].value;
    canvas.pushStep([43]);

    array.array[arrayIndex].color = Color.Transparent;
    left.array[leftIndex].color = Color.Transparent;
    arrayIndex++, leftIndex++;
    if (array.array[arrayIndex]) array.array[arrayIndex].color = Color.Primary;
    if (left.array[leftIndex]) left.array[leftIndex].color = Color.Secondary;
    canvas.pushStep([44]);

    canvas.pushStep([42]);
  }

  canvas.pushStep([47]);
  while (rightIndex < right.array.length) {
    array.array[arrayIndex].value = right.array[rightIndex].value;
    canvas.pushStep([48]);

    array.array[arrayIndex].color = Color.Transparent;
    right.array[rightIndex].color = Color.Transparent;
    arrayIndex++, rightIndex++;
    if (array.array[arrayIndex]) array.array[arrayIndex].color = Color.Primary;
    if (right.array[rightIndex])
      right.array[rightIndex].color = Color.Secondary;
    canvas.pushStep([49]);

    canvas.pushStep([47]);
  }

  canvas.pushStep([52]);
  canvas.pushStep([53]);
  return;
}

export const mergeSortCode = `function mergeSort(array) {
  if (array.length <= 1) {
    return;
  }

  const mid = Math.floor(array.length / 2);

  const left = new Array();
  const right = new Array();

  for (let i = 0; i < mid; i++) {
    left.push(array[i]);
  }

  for (let i = mid; i < array.length; i++) {
    right.push(array[i]);
  }

  mergeSort(left);
  mergeSort(right);

  merge(left, right)

  return;
}

function merge(array, left, right) {
  let arrayIndex = 0;

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[arrayIndex] = left[leftIndex];
      arrayIndex++, leftIndex++;
    } else {
      array[arrayIndex] = right[rightIndex];
      arrayIndex++, rightIndex++;
    }
  }

  while (leftIndex < left.length) {
      array[arrayIndex] = left[leftIndex];
      arrayIndex++, leftIndex++;
  }

  while (rightIndex < right.length) {
      array[arrayIndex] = right[rightIndex];
      arrayIndex++, rightIndex++;
  }

  return;
}`;

export default mergeSortAlgorithmFunction;
