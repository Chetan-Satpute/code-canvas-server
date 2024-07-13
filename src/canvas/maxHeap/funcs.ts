import {AlgorithmFunctionType, FunctionSection} from '../types.js';
import randomMaxHeap from './modify/random.js';

export enum MaxHeapFunctionId {
  Random = 'random',
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
    ],
  },
];

export const maxHeapFunctionMap: Record<string, AlgorithmFunctionType> = {
  [MaxHeapFunctionId.Random]: randomMaxHeap,
};

export const maxHeapCodeMap: Record<string, string> = {};
