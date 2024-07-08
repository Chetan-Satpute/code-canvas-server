import {
  binarySearchTreeCodeMap,
  binarySearchTreeFunctionMap,
  binarySearchTreeFunctionSections,
} from './binarySearchTree/funcs.js';
import BinarySearchTree from './binarySearchTree/index.js';
import {linkedListFunctionSections} from './linkedList/funcs.js';
import LinkedList from './linkedList/index.js';
import {maxHeapFunctionSections} from './maxHeap/funcs.js';
import MaxHeap from './maxHeap/index.js';
import {
  arrayAlgorithmFunctionCodeMap,
  arrayAlgorithmFunctionMap,
  arrayFunctionSections,
} from './nodeArray/funcs.js';
import NodeArray from './nodeArray/index.js';
import Structure from './structure.js';
import {AlgorithmFunctionType, FunctionSection} from './types.js';

export enum StructureName {
  Array = 'array',
  BinarySearchTree = 'binary-search-tree',
  LinkedList = 'linked-list',
  MaxHeap = 'max-heap',
}

export const algorithmFunctionMap: Record<
  StructureName,
  Record<string, AlgorithmFunctionType>
> = {
  [StructureName.Array]: arrayAlgorithmFunctionMap,
  [StructureName.BinarySearchTree]: binarySearchTreeFunctionMap,
  [StructureName.LinkedList]: {},
  [StructureName.MaxHeap]: {},
};

export const algorithmFunctionCodeMap: Record<
  StructureName,
  Record<string, string>
> = {
  [StructureName.Array]: arrayAlgorithmFunctionCodeMap,
  [StructureName.BinarySearchTree]: binarySearchTreeCodeMap,
  [StructureName.LinkedList]: {},
  [StructureName.MaxHeap]: {},
};

export function getRandomStructureByName(
  structureName: StructureName
): Structure {
  switch (structureName) {
    case StructureName.Array:
      return NodeArray.random();
    case StructureName.BinarySearchTree:
      return BinarySearchTree.random();
    case StructureName.LinkedList:
      return LinkedList.random();
    case StructureName.MaxHeap:
      return MaxHeap.random();
    default:
      return new Structure();
  }
}

export function getStructureFromData(
  structureName: StructureName,
  data: string
) {
  switch (structureName) {
    case StructureName.Array:
      return NodeArray.fromData(data);
    case StructureName.BinarySearchTree:
      return BinarySearchTree.fromData(data);
    case StructureName.LinkedList:
      return LinkedList.fromData(data);
    case StructureName.MaxHeap:
      return MaxHeap.fromData(data);
    default:
      return new Structure();
  }
}

export function getFunctionSectionByName(
  structureName: StructureName
): FunctionSection[] {
  switch (structureName) {
    case StructureName.Array:
      return arrayFunctionSections;
    case StructureName.BinarySearchTree:
      return binarySearchTreeFunctionSections;
    case StructureName.LinkedList:
      return linkedListFunctionSections;
    case StructureName.MaxHeap:
      return maxHeapFunctionSections;
    default:
      return [];
  }
}

export function getAlgorithmFunction(
  structureName: StructureName,
  functionId: string
) {
  return algorithmFunctionMap[structureName][functionId] || null;
}

export function getAlgorithmFunctionCode(
  structureName: StructureName,
  functionId: string
) {
  return algorithmFunctionCodeMap[structureName][functionId] || '';
}
