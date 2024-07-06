import {
  AlgorithmFunctionType,
  FunctionArgumentType,
  FunctionSection,
} from '../types.js';
import randomArray from './modify/randomArray.js';
import setArray from './modify/setArray.js';
import sortArray from './modify/sortArray.js';
import binarySearch, {binarySearchCode} from './search/binarySearch.js';
import linearSearch, {linearSearchCode} from './search/linearSearch.js';
import bubbleSort, {bubbleSortCode} from './sort/bubbleSort.js';

export enum ArrayFunctionId {
  RandomArray = 'random-array',
  SetArray = 'set-array',
  SortArray = 'sort-array',
  LinearSearch = 'linear-search',
  BinarySearch = 'binary-search',
  Bubblesort = 'bubble-sort',
}

export const arrayFunctionSections: FunctionSection[] = [
  {
    title: 'Modify',
    functions: [
      {
        id: ArrayFunctionId.RandomArray,
        name: 'Random array',
        parameters: [],
        animated: false,
      },
      {
        id: ArrayFunctionId.SortArray,
        name: 'Sort array',
        parameters: [],
        animated: false,
      },
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
  {
    title: 'Sort',
    functions: [
      {
        id: ArrayFunctionId.Bubblesort,
        name: 'Bubble sort',
        parameters: [],
        animated: true,
      },
    ],
  },
];

export const arrayAlgorithmFunctionMap: Record<string, AlgorithmFunctionType> =
  {
    [ArrayFunctionId.RandomArray]: randomArray,
    [ArrayFunctionId.SetArray]: setArray,
    [ArrayFunctionId.SortArray]: sortArray,
    [ArrayFunctionId.LinearSearch]: linearSearch,
    [ArrayFunctionId.BinarySearch]: binarySearch,
    [ArrayFunctionId.Bubblesort]: bubbleSort,
  };

export const arrayAlgorithmFunctionCodeMap: Record<string, string> = {
  [ArrayFunctionId.LinearSearch]: linearSearchCode,
  [ArrayFunctionId.BinarySearch]: binarySearchCode,
  [ArrayFunctionId.Bubblesort]: bubbleSortCode,
};
