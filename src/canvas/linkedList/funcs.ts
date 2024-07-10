import {AlgorithmFunctionType, FunctionSection} from '../types.js';
import randomLinkedList from './modify/random.js';

export enum LinkedListFunctionId {
  Random = 'random',
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
    ],
  },
];

export const linkedListFunctionMap: Record<string, AlgorithmFunctionType> = {
  [LinkedListFunctionId.Random]: randomLinkedList,
};

export const linkedListCodeMap: Record<string, string> = {};
