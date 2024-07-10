import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import insertAfter, {insertAfterCode} from './animated/insertAfter.js';
import insertHead, {insertHeadCode} from './animated/insertHead.js';
import removeHead, {removeHeadCode} from './animated/removeHead.js';
import randomLinkedList from './modify/random.js';
import setLinkedList from './modify/set.js';

export enum LinkedListFunctionId {
  Random = 'random',
  Set = 'set',
  InsertHead = 'insert-head',
  RemoveHead = 'remove-head',
  InsertAfter = 'insert-after',
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
  {
    title: 'Animated',
    functions: [
      {
        id: LinkedListFunctionId.InsertHead,
        name: 'Insert at head',
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
        id: LinkedListFunctionId.RemoveHead,
        name: 'Remove at head',
        parameters: [],
        animated: true,
      },
      {
        id: LinkedListFunctionId.InsertAfter,
        name: 'Insert after node',
        parameters: [
          {
            label: 'value',
            placeholder: 'value',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'value to insert',
          },
          {
            label: 'nodeValue',
            placeholder: 'node value',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'value of node to insert after',
          },
        ],
        animated: true,
      },
    ],
  },
];

export const linkedListFunctionMap: Record<string, AlgorithmFunctionType> = {
  [LinkedListFunctionId.Random]: randomLinkedList,
  [LinkedListFunctionId.Set]: setLinkedList,
  [LinkedListFunctionId.InsertHead]: insertHead,
  [LinkedListFunctionId.RemoveHead]: removeHead,
  [LinkedListFunctionId.InsertAfter]: insertAfter,
};

export const linkedListCodeMap: Record<string, string> = {
  [LinkedListFunctionId.InsertHead]: insertHeadCode,
  [LinkedListFunctionId.RemoveHead]: removeHeadCode,
  [LinkedListFunctionId.InsertAfter]: insertAfterCode,
};
