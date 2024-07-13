import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import randomMaxHeap from './modify/random.js';
import setMaxHeap from './modify/setHeap.js';

export enum MaxHeapFunctionId {
  Random = 'random',
  Set = 'set',
}

export const maxHeapFunctionSections: FunctionSection[] = [
  {
    title: 'Modify',
    functions: [
      {
        id: MaxHeapFunctionId.Random,
        name: 'Random max heap',
        parameters: [],
        animated: false,
      },
      {
        id: MaxHeapFunctionId.Set,
        name: 'Set max heap',
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
    ],
  },
];

export const maxHeapFunctionMap: Record<string, AlgorithmFunctionType> = {
  [MaxHeapFunctionId.Random]: randomMaxHeap,
  [MaxHeapFunctionId.Set]: setMaxHeap,
};

export const maxHeapCodeMap: Record<string, string> = {};
