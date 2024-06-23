import {randomNumber, randomNumberArray} from '../../utils/number.js';
import {EdgeType, Frame} from '../frame.js';
import Node from '../node/index.js';
import Structure from '../structure.js';

class BinarySearchTreeNode extends Node {
  leftNode: BinarySearchTreeNode | null;
  rightNode: BinarySearchTreeNode | null;

  leftEdgePercent: number;
  rightEdgePercent: number;

  constructor(value = 0) {
    super(value);

    this.leftNode = null;
    this.rightNode = null;

    this.leftEdgePercent = 100;
    this.rightEdgePercent = 100;
  }

  toFrame(frame?: Frame | undefined): Frame {
    frame = super.toFrame(frame);

    if (this.leftNode) {
      frame.edges.push({
        startNodePosition: {x: this.x, y: this.y},
        endNodePosition: {x: this.leftNode.x, y: this.leftNode.y},
        type: EdgeType.DIRECTED,
        opacity: this.opacity,
        percent: this.leftEdgePercent,
      });
    }

    if (this.rightNode) {
      frame.edges.push({
        startNodePosition: {x: this.x, y: this.y},
        endNodePosition: {x: this.rightNode.x, y: this.rightNode.y},
        type: EdgeType.DIRECTED,
        opacity: this.opacity,
        percent: this.rightEdgePercent,
      });
    }

    return frame;
  }
}

class BinarySearchTree extends Structure {
  root: BinarySearchTreeNode | null;

  constructor() {
    super();

    this.root = null;
  }

  insert(value: number) {
    const node = new BinarySearchTreeNode(value);

    if (!this.root) {
      this.root = node;
      return;
    }

    let ptrParent: BinarySearchTreeNode = this.root;
    let ptr: BinarySearchTreeNode | null = this.root;

    while (ptr) {
      if (node.value === ptr.value) {
        // node with value already present
        return;
      } else if (node.value < ptr.value) {
        ptrParent = ptr;
        ptr = ptr.leftNode;
      } else if (node.value > ptr.value) {
        ptrParent = ptr;
        ptr = ptr.rightNode;
      }
    }

    if (node.value < ptrParent.value) {
      ptrParent.leftNode = node;
    } else if (node.value > ptrParent.value) {
      ptrParent.rightNode = node;
    }
  }

  rearrange(): void {
    let x = this.x;

    const recurse = (node: BinarySearchTreeNode | null, height: number) => {
      if (!node) return;

      if (node.leftNode) recurse(node.leftNode, height + 1);

      node.x = x;
      node.y = this.y + height * Node.HEIGHT * 2;

      x += Node.WIDTH;

      if (node.rightNode) recurse(node.rightNode, height + 1);
    };

    recurse(this.root, 0);
  }

  toFrame(frame?: Frame | undefined): Frame {
    frame = super.toFrame(frame);

    const recurse = (node: BinarySearchTreeNode | null) => {
      if (!node) return;

      node.toFrame(frame);

      if (node.leftNode) recurse(node.leftNode);
      if (node.rightNode) recurse(node.rightNode);
    };

    recurse(this.root);

    return frame;
  }

  toData(): string {
    const preOrderValues: number[] = [];

    const recurse = (node: BinarySearchTreeNode | null) => {
      if (!node) return;

      preOrderValues.push(node.value);
      if (node.leftNode) recurse(node.leftNode);
      if (node.rightNode) recurse(node.rightNode);
    };

    recurse(this.root);

    return `[${preOrderValues}]`;
  }

  static random(): BinarySearchTree {
    const arrayLength = randomNumber(3, 8);
    const numberArray = randomNumberArray(arrayLength, 0, 100);

    const binarySearchTree = new BinarySearchTree();

    for (const value of numberArray) binarySearchTree.insert(value);
    binarySearchTree.rearrange();

    return binarySearchTree;
  }
}

export default BinarySearchTree;