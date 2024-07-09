import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import BinarySearchTree from '../index.js';

const searchAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const tree = structure as BinarySearchTree;
  const target = args.target as number;

  search(canvas, tree, target);
};

function search(canvas: Canvas, tree: BinarySearchTree, target: number) {
  canvas.pushStack(`search(tree, target=${target})`);
  canvas.pushStep([0]);

  let ptr = tree.root;
  if (ptr) ptr.color = Color.Primary;
  canvas.pushStep([1]);

  canvas.pushStep([3]);
  while (ptr) {
    canvas.pushStep([4]);
    if (target === ptr.value) {
      ptr.color = Color.Success;
      canvas.pushStep([5]);
      ptr.color = Color.Transparent;
      canvas.pushStep([14]);
      return;
    } else if (target < ptr.value) {
      canvas.pushStep([6]);

      if (ptr) ptr.color = Color.Transparent;
      ptr = ptr.leftNode;
      if (ptr) ptr.color = Color.Primary;
      canvas.pushStep([7]);
    } else if (target > ptr.value) {
      canvas.pushStep([6]);
      canvas.pushStep([8]);

      if (ptr) ptr.color = Color.Transparent;
      ptr = ptr.rightNode;
      if (ptr) ptr.color = Color.Primary;
      canvas.pushStep([9]);
    }

    canvas.pushStep([3]);
  }

  tree.forEach(tree.root, node => (node.color = Color.Error));
  canvas.pushStep([13]);
  tree.forEach(tree.root, node => (node.color = Color.Transparent));
  canvas.pushStep([14]);
  return;
}

export const searchCode = `function search(tree, target) {
  let ptr = tree.root;

  while (ptr) {
    if (target === ptr.value) {
      return ptr;
    } else if (target < ptr.value) {
      ptr = ptr.left;
    } else if (target > ptr.value) {
      ptr = ptr.right;
    }
  }

  return null;
}`;

export default searchAlgorithmFunction;
