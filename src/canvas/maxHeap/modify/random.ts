import {randomNumber, randomNumberArray} from '../../../utils/number.js';
import {AlgorithmFunctionType} from '../../types.js';
import MaxHeap from '../index.js';

const random: AlgorithmFunctionType = (_canvas, structure, _args) => {
  const heap = structure as MaxHeap;

  const arrayLength = randomNumber(3, 8);
  const numberArray = randomNumberArray(arrayLength, 0, 100);

  heap.array = [];

  for (const value of numberArray) heap.insert(value);
  heap.rearrange();
};

export default random;
