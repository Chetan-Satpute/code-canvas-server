import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import randomLinkedList from './modify/random.js';
import setLinkedList from './modify/set.js';

export enum LinkedListFunctionId {
  Random = 'random',
  Set = 'set',
}

export const linkedListFunctionSections: FunctionSection[] = [
  {
    title: 'Modify',
    functions: [
      {
        id: LinkedListFunctionId.Random,
        name: 'Random linked list',
        parameters: [],
        animated: false,
      },
      {
        id: LinkedListFunctionId.Set,
        name: 'Set linked list',
        parameters: [
          {
            label: 'values',
            placeholder: '1,2,3,4,5',
            argumentType: FunctionArgumentType.NumberArray,
            supportingText: 'comma seperated values',
          },
        ],
        animated: false,
      },
    ],
  },
];

export const linkedListFunctionMap: Record<string, AlgorithmFunctionType> = {
  [LinkedListFunctionId.Random]: randomLinkedList,
  [LinkedListFunctionId.Set]: setLinkedList,
};

export const linkedListCodeMap: Record<string, string> = {};
