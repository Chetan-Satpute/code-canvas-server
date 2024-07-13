import {randomNumber, randomNumberArray} from '../../../utils/number.js';
import {AlgorithmFunctionType} from '../../types.js';
import BinarySearchTree from '../index.js';

const randomBinarySearchTree: AlgorithmFunctionType = (
  _canvas,
  structure,
  _args
) => {
  const tree = structure as BinarySearchTree;

  const arrayLength = randomNumber(3, 8);
  const numberArray = randomNumberArray(arrayLength, 0, 100);

  tree.root = null;

  for (const value of numberArray) tree.insert(value);
  tree.rearrange();
};

export default randomBinarySearchTree;
