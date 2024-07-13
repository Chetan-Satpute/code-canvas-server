import {AlgorithmFunctionType} from '../../types.js';
import MaxHeap from '../index.js';

const setHeap: AlgorithmFunctionType = (_canvas, structure, args) => {
  const heap = structure as MaxHeap;
  const numberArray = args.values as number[];

  heap.array = [];

  for (const value of numberArray) heap.insert(value);
  heap.rearrange();
};

export default setHeap;
