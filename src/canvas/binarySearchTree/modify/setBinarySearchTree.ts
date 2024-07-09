import {AlgorithmFunctionType} from '../../types.js';
import BinarySearchTree from '../index.js';

const setBinarySearchTree: AlgorithmFunctionType = (
  _canvas,
  structure,
  args
) => {
  const tree = structure as BinarySearchTree;
  const values = args.values as number[];

  tree.root = null;

  for (const value of values) tree.insert(value);
  tree.rearrange();
};

export default setBinarySearchTree;
