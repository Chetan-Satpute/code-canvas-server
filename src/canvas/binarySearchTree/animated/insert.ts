import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import BinarySearchTree, {BinarySearchTreeNode} from '../index.js';

const insertAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const tree = structure as BinarySearchTree;
  const value = args.value as number;

  insert(canvas, tree, value);
};

function insert(canvas: Canvas, tree: BinarySearchTree, value: number) {
  canvas.pushStack(`insert(tree, value=${value})`);
  canvas.pushStep([0]);

  const node = new BinarySearchTreeNode(value);
  node.opacity = 0;
  canvas.pushStep([1]);

  canvas.pushStep([3]);
  if (!tree.root) {
    tree.root = node;
    tree.rearrange();
    node.color = Color.Success;
    node.fadeIn(canvas);
    canvas.pushStep([4]);

    node.color = Color.Transparent;
    canvas.pushStep([30]);
    return;
  }

  let parent: BinarySearchTreeNode | null = tree.root;
  let ptr: BinarySearchTreeNode | null = tree.root;
  ptr.color = Color.Primary;
  canvas.pushStep([7, 8]);

  canvas.pushStep([10]);
  while (ptr) {
    canvas.pushStep([11]);
    if (ptr.value === value) {
      ptr.color = Color.Success;
      parent.color = Color.Transparent;
      canvas.pushStep([13]);

      ptr.color = Color.Transparent;
      canvas.pushStep([30]);
      return;
    } else if (value < ptr.value) {
      canvas.pushStep([14]);

      if (parent) parent.color = Color.Transparent;
      parent = ptr;
      if (parent) parent.color = Color.Secondary;
      canvas.pushStep([15]);

      ptr = ptr.leftNode;
      if (ptr) ptr.color = Color.Primary;
      canvas.pushStep([16]);
    } else if (value > ptr.value) {
      canvas.pushStep([14]);
      canvas.pushStep([17]);

      if (parent) parent.color = Color.Transparent;
      parent = ptr;
      if (parent) parent.color = Color.Secondary;
      canvas.pushStep([18]);

      ptr = ptr.rightNode;
      if (ptr) ptr.color = Color.Primary;
      parent.color = Color.Secondary;
      canvas.pushStep([19]);
    }

    canvas.pushStep([10]);
  }

  canvas.pushStep([23]);
  if (value < parent.value) {
    parent.leftNode = node;
    parent.leftEdgePercent = 0;
    tree.rearrange();
    node.fadeIn(canvas);
    parent.growEdge(canvas, 'left');
    canvas.pushStep([24]);
  } else {
    parent.rightNode = node;
    parent.rightEdgePercent = 0;
    tree.rearrange();
    node.fadeIn(canvas);
    parent.growEdge(canvas, 'right');
    canvas.pushStep([26]);
  }

  parent.color = Color.Transparent;
  node.color = Color.Success;
  canvas.pushStep([29]);
  node.color = Color.Transparent;
  canvas.pushStep([30]);
  return;
}

export const insertCode = `function insert(tree, value) {
  const node = new BinarySearchTreeNode(value);

  if (!tree.root) {
    return tree.root = node;
  }

  let parent = tree.root;
  let ptr = tree.root;

  while (ptr) {
    if (ptr.value === value) {
      // node already present
      return ptr;
    } else if (value < ptr.value) {
      parent = ptr;
      ptr = ptr.left;
    } else if (value > ptr.value) {
      parent = ptr;
      ptr = ptr.right;
    }
  }

  if (value < parent.value) {
    parent.left = node;
  } else {
    parent.right = node;
  }

  return node;
}`;

export default insertAlgorithmFunction;
