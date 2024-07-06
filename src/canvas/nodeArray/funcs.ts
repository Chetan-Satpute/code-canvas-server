import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import setArray from './modify/setArray.js';
import binarySearch, {binarySearchCode} from './search/binarySearch.js';
import linearSearch, {linearSearchCode} from './search/linearSearch.js';

export enum ArrayFunctionId {
  SetArray = 'set-array',
  LinearSearch = 'linear-search',
  BinarySearch = 'binary-search',
}

export const arrayFunctionSections: FunctionSection[] = [
  {
    title: 'Modify',
    functions: [
      {
        id: ArrayFunctionId.SetArray,
        name: 'Set array',
        parameters: [
          {
            label: 'values',
            placeholder: '0,1,2,3,4,5',
            argumentType: FunctionArgumentType.NumberArray,
            supportingText: 'comma seperated values of array',
          },
        ],
        animated: false,
      },
    ],
  },
  {
    title: 'Search',
    functions: [
      {
        id: ArrayFunctionId.LinearSearch,
        name: 'Linear search',
        parameters: [
          {
            label: 'target',
            placeholder: '0',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'target value to find in array',
          },
        ],
        animated: true,
      },
      {
        id: ArrayFunctionId.BinarySearch,
        name: 'Binary search',
        parameters: [
          {
            label: 'target',
            placeholder: '0',
            argumentType: FunctionArgumentType.Number,
            supportingText: 'target value to find in array',
          },
        ],
        animated: true,
      },
    ],
  },
];

export const arrayAlgorithmFunctionMap: Record<string, AlgorithmFunctionType> =
  {
    [ArrayFunctionId.SetArray]: setArray,
    [ArrayFunctionId.LinearSearch]: linearSearch,
    [ArrayFunctionId.BinarySearch]: binarySearch,
  };

export const arrayAlgorithmFunctionCodeMap: Record<string, string> = {
  [ArrayFunctionId.LinearSearch]: linearSearchCode,
  [ArrayFunctionId.BinarySearch]: binarySearchCode,
};
