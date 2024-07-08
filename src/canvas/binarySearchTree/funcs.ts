import {AlgorithmFunctionType, FunctionSection} from '../types.js';
import randomBinarySearchTree from './modify/randomBinarySearchTree.js';

export enum BinarySearchTreeFunctionId {
  RandomBinarySearchTree = 'random-binary-search-tree',
}

export const binarySearchTreeFunctionSections: FunctionSection[] = [
  {
    title: 'Modify',
    functions: [
      {
        id: BinarySearchTreeFunctionId.RandomBinarySearchTree,
        name: 'Random binary search tree',
        parameters: [],
        animated: false,
      },
    ],
  },
];

export const binarySearchTreeFunctionMap: Record<
  string,
  AlgorithmFunctionType
> = {
  [BinarySearchTreeFunctionId.RandomBinarySearchTree]: randomBinarySearchTree,
};

export const binarySearchTreeCodeMap: Record<string, string> = {};
