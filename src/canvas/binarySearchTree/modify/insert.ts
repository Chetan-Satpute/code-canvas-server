import {AlgorithmFunctionType} from '../../types.js';
import BinarySearchTree from '../index.js';

const insert: AlgorithmFunctionType = (_canvas, structure, args) => {
  const tree = structure as BinarySearchTree;
  const value = args.value as number;

  tree.insert(value);
  tree.rearrange();
};

export default insert;
