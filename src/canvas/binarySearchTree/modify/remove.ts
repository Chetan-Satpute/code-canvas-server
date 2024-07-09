import {AlgorithmFunctionType} from '../../types.js';
import BinarySearchTree, {BinarySearchTreeNode} from '../index.js';

const remove: AlgorithmFunctionType = (_canvas, structure, args) => {
  const tree = structure as BinarySearchTree;
  const value = args.value as number;

  const _remove = (
    node: BinarySearchTreeNode | null,
    target: number
  ): BinarySearchTreeNode | null => {
    if (!node) return null;

    if (target < node.value) {
      node.leftNode = _remove(node.leftNode, target);
    } else if (target > node.value) {
      node.rightNode = _remove(node.rightNode, target);
    } else {
      if (!node.leftNode && !node.rightNode) {
        return null;
      }

      if (!node.leftNode) {
        return node.rightNode;
      }

      if (!node.rightNode) {
        return node.leftNode;
      }

      let successor: BinarySearchTreeNode = node.rightNode;
      while (successor.leftNode) {
        successor = successor.leftNode;
      }

      node.value = successor.value;

      node.rightNode = _remove(node.rightNode, successor.value);
    }

    return node;
  };

  tree.root = _remove(tree.root, value);
  tree.rearrange();
};

export default remove;
