import {randomNumber, randomNumberArray} from '../../utils/number.js';
import {EdgeType, Frame} from '../frame.js';
import Node from '../node/index.js';
import Structure from '../structure.js';

class MaxHeapNode extends Node {
  leftEdgePercent: number;
  rightEdgePercent: number;

  constructor(value = 0) {
    super(value);

    this.leftEdgePercent = 100;
    this.rightEdgePercent = 100;
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

    const recurse = (index: number) => {
      if (index >= this.array.length) return;

      const height = Math.floor(Math.log2(index + 1));

      const leftIndex = 2 * index + 1;
      if (leftIndex < this.array.length) recurse(leftIndex);

      this.array[index].x = x;
      this.array[index].y = this.y + height * Node.HEIGHT * 2;

      x += Node.WIDTH;

      const rightIndex = 2 * index + 2;
      if (rightIndex < this.array.length) recurse(rightIndex);
    };

    recurse(0);
  }

  toFrame(frame?: Frame | undefined): Frame {
    frame = super.toFrame(frame);

    this.array.forEach((node, index) => {
      node.toFrame(frame);

      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < this.array.length) {
        const leftNode = this.array[leftIndex];

        frame.edges.push({
          startNodePosition: {x: node.x, y: node.y},
          endNodePosition: {x: leftNode.x, y: leftNode.y},
          type: EdgeType.DIRECTED,
          opacity: node.opacity,
          percent: node.leftEdgePercent,
        });
      }

      if (rightIndex < this.array.length) {
        const rightNode = this.array[rightIndex];

        frame.edges.push({
          startNodePosition: {x: node.x, y: node.y},
          endNodePosition: {x: rightNode.x, y: rightNode.y},
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
