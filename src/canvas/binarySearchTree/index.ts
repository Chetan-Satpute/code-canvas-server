import {randomNumber, randomNumberArray} from '../../utils/number.js';
import {EdgeType, Frame} from '../frame.js';
import Node from '../node/index.js';
import Structure from '../structure.js';

type BinarySearchTreeDataNode = {
  value: number;
  left: BinarySearchTreeDataNode;
  right: BinarySearchTreeDataNode;
} | null;

export class BinarySearchTreeNode extends Node {
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

      node.label = {};

      x += Node.WIDTH;

      if (node.rightNode) recurse(node.rightNode, height + 1);
    };

    recurse(this.root, 0);

    if (this.root) this.root.label.top = 'root';
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
    if (!this.root) return JSON.stringify(null);

    const recurse = (
      node: BinarySearchTreeNode | null
    ): BinarySearchTreeDataNode => {
      if (!node) return null;

      const data: BinarySearchTreeDataNode = {
        value: node.value,
        left: recurse(node.leftNode),
        right: recurse(node.rightNode),
      };

      return data;
    };

    const data = recurse(this.root);

    return JSON.stringify(data);
  }

  forEach(
    root: BinarySearchTreeNode | null,
    callback: (node: BinarySearchTreeNode) => void
  ) {
    if (!root) return;

    const _recurse = (node: BinarySearchTreeNode | null) => {
      if (!node) return;

      _recurse(node.leftNode);
      callback(node);
      _recurse(node.rightNode);
    };

    _recurse(root);
  }

  static fromData(dataString: string): BinarySearchTree {
    const data = JSON.parse(dataString) as BinarySearchTreeDataNode;

    const tree = new BinarySearchTree();

    if (!data) return tree;

    const recurse = (
      dataNode: BinarySearchTreeDataNode
    ): BinarySearchTreeNode | null => {
      if (!dataNode) return null;

      const node = new BinarySearchTreeNode();

      node.value = dataNode.value;
      node.leftNode = recurse(dataNode.left);
      node.rightNode = recurse(dataNode.right);

      return node;
    };

    tree.root = recurse(data);
    tree.rearrange();

    return tree;
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
