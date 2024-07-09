import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import animatedInsert, {
  insertCode as animatedInsertCode,
} from './animated/insert.js';
import animatedRemove, {
  removeCode as animatedRemoveCode,
} from './animated/remove.js';
import search, {searchCode} from './animated/search.js';
import insert from './modify/insert.js';
import randomBinarySearchTree from './modify/randomBinarySearchTree.js';
import remove from './modify/remove.js';
import setBinarySearchTree from './modify/setBinarySearchTree.js';

export enum BinarySearchTreeFunctionId {
  RandomBinarySearchTree = 'random-binary-search-tree',
  SetBinarySearchTree = 'set-binary-search-tree',
  Insert = 'insert',
  Remove = 'remove',
  Search = 'search',
  AnimatedInsert = 'animated-insert',
  AnimatedRemove = 'animated-remove',
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
        name: 'Insert',
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
        name: 'Remove',
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
  {
    title: 'Animated',
    functions: [
      {
        id: BinarySearchTreeFunctionId.Search,
        name: 'Search',
        parameters: [
          {
            label: 'target',
            placeholder: '0',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'value to search',
          },
        ],
        animated: true,
      },
      {
        id: BinarySearchTreeFunctionId.AnimatedInsert,
        name: 'Insert',
        parameters: [
          {
            label: 'value',
            placeholder: '0',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'value to insert',
          },
        ],
        animated: true,
      },
      {
        id: BinarySearchTreeFunctionId.AnimatedRemove,
        name: 'Remove',
        parameters: [
          {
            label: 'value',
            placeholder: '0',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'value to remove',
          },
        ],
        animated: true,
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
  [BinarySearchTreeFunctionId.Search]: search,
  [BinarySearchTreeFunctionId.AnimatedInsert]: animatedInsert,
  [BinarySearchTreeFunctionId.AnimatedRemove]: animatedRemove,
};

export const binarySearchTreeCodeMap: Record<string, string> = {
  [BinarySearchTreeFunctionId.Search]: searchCode,
  [BinarySearchTreeFunctionId.AnimatedInsert]: animatedInsertCode,
  [BinarySearchTreeFunctionId.AnimatedRemove]: animatedRemoveCode,
};
