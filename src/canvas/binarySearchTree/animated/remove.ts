import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import BinarySearchTree, {BinarySearchTreeNode} from '../index.js';
import {Color} from '../../color.js';

const removeAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const tree = structure as BinarySearchTree;
  const value = args.value as number;

  remove(canvas, tree, value);
};

function remove(canvas: Canvas, tree: BinarySearchTree, value: number) {
  canvas.pushStack(`remove(tree, value=${value})`);
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  tree.root = recursiveRemove(canvas, tree, tree.root, value);
  canvas.popStack();
  canvas.pushStep([1]);

  canvas.pushStep([3]);
  canvas.pushStep([4]);
  return;
}

function recursiveRemove(
  canvas: Canvas,
  tree: BinarySearchTree,
  node: BinarySearchTreeNode | null,
  value: number
): BinarySearchTreeNode | null {
  const nodeString =
    node === null ? 'null' : `BinarySearchTreeNode(${node.value})`;
  canvas.pushStack(`recursiveRemove(node=${nodeString}, value=${value})`);
  if (node) node.color = Color.Primary;
  canvas.pushStep([6]);

  canvas.pushStep([7]);
  if (node === null) {
    canvas.pushStep([8]);
    canvas.pushStep([46]);
    return null;
  }

  canvas.pushStep([12]);
  if (value < node.value) {
    canvas.pushStep([13]);
    const response = recursiveRemove(canvas, tree, node.leftNode, value);

    if (node.leftNode !== null) {
      if (response === null) {
        node.shrinkEdge(canvas, 'left');
        node.leftNode.fadeOut(canvas);

        const nodesleftOf = tree.allNodesRightOf(node.leftNode);
        for (let i = 0; i < BinarySearchTreeNode.WIDTH; i++) {
          for (const n of nodesleftOf) {
            n.x -= 1;
          }
          canvas.pushFrame();
        }

        node.leftNode = null;
      } else if (response === node.leftNode) {
        // nothing
      } else if (response !== node.leftNode) {
        node.shrinkEdge(canvas, 'left');
        node.leftNode.fadeOut(canvas);

        const nodesleftOf = tree.allNodesRightOf(node.leftNode);
        for (let i = 0; i < BinarySearchTreeNode.WIDTH; i++) {
          for (const n of nodesleftOf) {
            n.x -= 1;
          }
          canvas.pushFrame();
        }

        node.leftNode = response;

        node.growEdge(canvas, 'left');

        const nodes = tree.allNodesBelow(node.leftNode);
        for (let i = 0; i < BinarySearchTreeNode.HEIGHT * 2; i++) {
          for (const n of nodes) {
            n.y -= 1;
          }
          canvas.pushFrame();
        }
      }
    }

    if (node) node.color = Color.Primary;
    canvas.popStack();
    canvas.pushStep([13]);
  } else if (value > node.value) {
    canvas.pushStep([14]);
    canvas.pushStep([15]);
    const response = recursiveRemove(canvas, tree, node.rightNode, value);

    if (node.rightNode !== null) {
      if (response === null) {
        node.shrinkEdge(canvas, 'right');
        node.rightNode.fadeOut(canvas);

        const nodesRightOf = tree.allNodesRightOf(node.rightNode);
        for (let i = 0; i < BinarySearchTreeNode.WIDTH; i++) {
          for (const n of nodesRightOf) {
            n.x -= 1;
          }
          canvas.pushFrame();
        }

        node.rightNode = null;
      } else if (response === node.rightNode) {
        // nothing
      } else if (response !== node.rightNode) {
        node.shrinkEdge(canvas, 'right');
        node.rightNode.fadeOut(canvas);

        const nodesRightOf = tree.allNodesRightOf(node.rightNode);
        for (let i = 0; i < BinarySearchTreeNode.WIDTH; i++) {
          for (const n of nodesRightOf) {
            n.x -= 1;
          }
          canvas.pushFrame();
        }

        node.rightNode = response;

        node.growEdge(canvas, 'right');

        const nodes = tree.allNodesBelow(node.rightNode);
        for (let i = 0; i < BinarySearchTreeNode.HEIGHT * 2; i++) {
          for (const n of nodes) {
            n.y -= 1;
          }
          canvas.pushFrame();
        }
      }
    }

    if (node) node.color = Color.Primary;
    canvas.popStack();
    canvas.pushStep([15]);
  } else {
    canvas.pushStep([14]);

    node.color = Color.Error;
    canvas.pushStep([20]);
    if (node.leftNode === null && node.rightNode === null) {
      canvas.pushStep([21]);
      canvas.pushStep([46]);
      return null;
    }

    canvas.pushStep([25]);
    if (node.leftNode === null) {
      canvas.pushStep([26]);
      canvas.pushStep([46]);
      return node.rightNode;
    } else if (node.rightNode === null) {
      canvas.pushStep([27]);
      canvas.pushStep([46]);
      return node.leftNode;
    } else {
      canvas.pushStep([27]);
    }

    let successor = node.rightNode;
    if (successor) successor.color = Color.Secondary;
    canvas.pushStep([33]);

    canvas.pushStep([34]);
    while (successor.leftNode !== null) {
      if (successor) successor.color = Color.Transparent;
      successor = successor.leftNode;
      if (successor) successor.color = Color.Secondary;
      canvas.pushStep([35]);
      canvas.pushStep([34]);
    }

    node.value = successor.value;
    node.color = Color.Transparent;
    canvas.pushStep([39]);

    canvas.pushStep([42]);
    const response = recursiveRemove(
      canvas,
      tree,
      node.rightNode,
      successor.value
    );

    if (node.rightNode !== null) {
      if (response === null) {
        node.shrinkEdge(canvas, 'right');
        node.rightNode.fadeOut(canvas);

        const nodesRightOf = tree.allNodesRightOf(node.rightNode);
        for (let i = 0; i < BinarySearchTreeNode.WIDTH; i++) {
          for (const n of nodesRightOf) {
            n.x -= 1;
          }
          canvas.pushFrame();
        }

        node.rightNode = null;
      } else if (response === node.rightNode) {
        // nothing
      } else if (response !== node.rightNode) {
        node.shrinkEdge(canvas, 'right');
        node.rightNode.fadeOut(canvas);

        const nodesRightOf = tree.allNodesRightOf(node.rightNode);
        for (let i = 0; i < BinarySearchTreeNode.WIDTH; i++) {
          for (const n of nodesRightOf) {
            n.x -= 1;
          }
          canvas.pushFrame();
        }

        node.rightNode = response;

        node.growEdge(canvas, 'right');

        const nodes = tree.allNodesBelow(node.rightNode);
        for (let i = 0; i < BinarySearchTreeNode.HEIGHT * 2; i++) {
          for (const n of nodes) {
            n.y -= 1;
          }
          canvas.pushFrame();
        }
      }
    }

    canvas.popStack();
    canvas.pushStep([42]);
  }

  node.color = Color.Transparent;
  canvas.pushStep([45]);
  canvas.pushStep([46]);
  return node;
}

export const removeCode = `function remove(tree, value) {
  tree.root = recursiveRemove(tree.root, value);

  return;
}

function recursiveRemove(node, value) {
  if (node === null) {
    return null;
  }

  // Search for the node to remove
  if (value < node.value) {
    node.left = recursiveRemove(node.left, value);
  } else if (value > node.value) {
    node.right = recursiveRemove(node.right, value);
  } else {
    // Node found with the value to remove

    // Case 1: Node with no children (leaf node)
    if (node.left === null && node.right === null) {
      return null;
    }

    // Case 2: Node with one child
    if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    }

    // Case 3: Node with two children
    // Find the inorder successor
    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }

    // Copy the value of the inorder successor
    node.value = successor.value;

    // Recursively remove the inorder successor
    node.right = recursiveRemove(node.right, successor.value);
  }

  return node;
}`;

export default removeAlgorithmFunction;
