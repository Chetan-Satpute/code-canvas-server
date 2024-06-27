import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import setArray from './modify/setArray.js';

export enum ArrayFunctionId {
  SetArray = 'set-array',
}

export const arrayFunctionSections: FunctionSection[] = [
  {
    title: 'Modify array',
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
];

export const arrayAlgorithmFunctionMap: Record<string, AlgorithmFunctionType> =
  {
    [ArrayFunctionId.SetArray]: setArray,
  };
