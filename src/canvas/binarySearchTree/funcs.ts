import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import insert from './modify/insert.js';
import randomBinarySearchTree from './modify/randomBinarySearchTree.js';
import remove from './modify/remove.js';
import setBinarySearchTree from './modify/setBinarySearchTree.js';

export enum BinarySearchTreeFunctionId {
  RandomBinarySearchTree = 'random-binary-search-tree',
  SetBinarySearchTree = 'set-binary-search-tree',
  Insert = 'insert',
  Remove = 'remove',
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
      {
        id: BinarySearchTreeFunctionId.SetBinarySearchTree,
        name: 'Set binary search tree',
        parameters: [
          {
            label: 'values',
            placeholder: '1,2,3,4,5',
            argumentType: FunctionArgumentType.NumberArray,
            supportingText:
              'comma seperated values will be inserted in sequence',
          },
        ],
        animated: false,
      },
      {
        id: BinarySearchTreeFunctionId.Insert,
        name: 'Insert value',
        parameters: [
          {
            label: 'value',
            placeholder: '0',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'value to insert',
          },
        ],
        animated: false,
      },
      {
        id: BinarySearchTreeFunctionId.Remove,
        name: 'Remove value',
        parameters: [
          {
            label: 'value',
            placeholder: '0',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'value to remove',
          },
        ],
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
  [BinarySearchTreeFunctionId.SetBinarySearchTree]: setBinarySearchTree,
  [BinarySearchTreeFunctionId.Insert]: insert,
  [BinarySearchTreeFunctionId.Remove]: remove,
};

export const binarySearchTreeCodeMap: Record<string, string> = {};
