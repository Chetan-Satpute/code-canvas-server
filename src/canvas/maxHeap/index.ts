import {randomNumber, randomNumberArray} from '../../utils/number.js';
import {EdgeType, Frame} from '../frame.js';
import Canvas from '../index.js';
import Node from '../node/index.js';
import Structure from '../structure.js';

export class MaxHeapNode extends Node {
  treeX: number;
  treeY: number;

  leftEdgePercent: number;
  rightEdgePercent: number;

  constructor(value = 0) {
    super(value);

    this.treeX = this.x;
    this.treeY = this.y;

    this.leftEdgePercent = 100;
    this.rightEdgePercent = 100;
  }

  growLeftEdge(canvas: Canvas) {
    for (let i = 0; i <= 100; i++) {
      this.leftEdgePercent = i;
      canvas.pushFrame();
    }
  }

  shrinkLeftEdge(canvas: Canvas) {
    for (let i = 100; i >= 0; i--) {
      this.leftEdgePercent = i;
      canvas.pushFrame();
    }
  }

  growRightEdge(canvas: Canvas) {
    for (let i = 0; i <= 100; i++) {
      this.rightEdgePercent = i;
      canvas.pushFrame();
    }
  }

  shrinkRightEdge(canvas: Canvas) {
    for (let i = 100; i >= 0; i--) {
      this.rightEdgePercent = i;
      canvas.pushFrame();
    }
  }
}

class MaxHeap extends Structure {
  array: MaxHeapNode[];

  constructor() {
    super();

    this.array = [];
  }

  insert(value: number) {
    let index = this.array.length;
    this.array.push(new MaxHeapNode(value));

    while (index !== 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      const node = this.array[index];
      const parent = this.array[parentIndex];

      if (parent.value < node.value) {
        // swap parent and node values
        [parent.value, node.value] = [node.value, parent.value];
        index = parentIndex;
      } else break;
    }
  }

  rearrange(): void {
    let x = this.x;
    let y = this.y;

    for (const node of this.array) {
      node.x = x;
      node.y = y;

      node.corners = 0b0000;

      x += MaxHeapNode.WIDTH;
    }

    if (this.array.length > 0) {
      this.array[0].corners |= 0b1001;
      this.array[this.array.length - 1].corners |= 0b0110;
    }

    x = this.x;
    y = this.y + Node.HEIGHT * 3;

    const recurse = (index: number) => {
      if (index >= this.array.length) return;

      const height = Math.floor(Math.log2(index + 1));

      const leftIndex = 2 * index + 1;
      if (leftIndex < this.array.length) recurse(leftIndex);

      this.array[index].treeX = x;
      this.array[index].treeY = y + height * Node.HEIGHT * 2;

      this.array[index].label = {};

      x += Node.WIDTH;

      const rightIndex = 2 * index + 2;
      if (rightIndex < this.array.length) recurse(rightIndex);
    };

    recurse(0);

    if (this.array.length > 0) this.array[0].label.top = 'top';
  }

  toFrame(frame?: Frame | undefined): Frame {
    frame = super.toFrame(frame);

    this.array.forEach(node => {
      node.toFrame(frame);
    });

    this.array.forEach((node, index) => {
      node.toFrame(frame, node.treeX, node.treeY, 0b1111);

      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < this.array.length) {
        const leftNode = this.array[leftIndex];

        frame.edges.push({
          startNodePosition: {x: node.treeX, y: node.treeY},
          endNodePosition: {x: leftNode.treeX, y: leftNode.treeY},
          type: EdgeType.DIRECTED,
          opacity: node.opacity,
          percent: node.leftEdgePercent,
        });
      }

      if (rightIndex < this.array.length) {
        const rightNode = this.array[rightIndex];

        frame.edges.push({
          startNodePosition: {x: node.treeX, y: node.treeY},
          endNodePosition: {x: rightNode.treeX, y: rightNode.treeY},
          type: EdgeType.DIRECTED,
          opacity: node.opacity,
          percent: node.rightEdgePercent,
        });
      }
    });

    return frame;
  }

  toData(): string {
    const values = this.array.map(node => node.value);
    return `[${values}]`;
  }

  static fromData(data: string): MaxHeap {
    const numberArray = JSON.parse(data) as number[];

    const maxHeap = new MaxHeap();
    for (const value of numberArray) maxHeap.insert(value);
    maxHeap.rearrange();

    return maxHeap;
  }

  static random(): MaxHeap {
    const arrayLength = randomNumber(3, 8);
    const numberArray = randomNumberArray(arrayLength, 0, 100);

    const maxHeap = new MaxHeap();
    for (const value of numberArray) maxHeap.insert(value);

    maxHeap.rearrange();

    return maxHeap;
  }
}

export default MaxHeap;
