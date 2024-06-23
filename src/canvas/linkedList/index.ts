import {randomNumber, randomNumberArray} from '../../utils/number.js';
import {EdgeType, Frame} from '../frame.js';
import Node from '../node/index.js';
import Structure from '../structure.js';

class LinkedListNode extends Node {
  nextNode: LinkedListNode | null;
  previousNode: LinkedListNode | null;

  nextEdgePercent: number;
  previousEdgePercent: number;

  constructor(value = 0) {
    super(value);

    this.nextNode = null;
    this.previousNode = null;

    this.nextEdgePercent = 100;
    this.previousEdgePercent = 100;
  }

  toFrame(frame?: Frame | undefined): Frame {
    frame = super.toFrame(frame);

    if (this.nextNode) {
      let percent = this.nextEdgePercent;
      if (this.nextNode.previousNode) {
        percent += 1000 * this.nextNode.previousEdgePercent;
      }

      if (this.nextNode.previousNode)
        frame.edges.push({
          startNodePosition: {x: this.x, y: this.y},
          endNodePosition: {x: this.nextNode.x, y: this.nextNode.y},
          type: EdgeType.BIDIRECTED,
          opacity: this.opacity,
          percent: percent,
        });
    }

    return frame;
  }
}

class LinkedList extends Structure {
  head: LinkedListNode | null;

  constructor() {
    super();

    this.head = null;
  }

  rearrange(): void {
    let x = this.x;

    let ptr = this.head;

    while (ptr) {
      ptr.x = x;
      ptr.y = this.y;

      ptr.label = {};

      x += Node.WIDTH * 2;
      ptr = ptr.nextNode;
    }

    if (this.head) this.head.label.top = 'head';
  }

  toFrame(frame?: Frame | undefined): Frame {
    frame = super.toFrame(frame);

    let ptr = this.head;

    while (ptr) {
      ptr.toFrame(frame);
      ptr = ptr.nextNode;
    }

    return frame;
  }

  toData(): string {
    const values: number[] = [];

    let ptr = this.head;
    while (ptr) {
      values.push(ptr.value);
      ptr = ptr.nextNode;
    }

    return `[${values}]`;
  }

  static random(): LinkedList {
    const arrayLength = randomNumber(2, 8);
    const numberArray = randomNumberArray(arrayLength, 0, 100);

    const linkedList = new LinkedList();

    for (const value of numberArray) {
      const node = new LinkedListNode(value);

      if (!linkedList.head) {
        linkedList.head = node;
        continue;
      }

      node.nextNode = linkedList.head;
      linkedList.head.previousNode = node;

      node.previousNode = linkedList.head;
      linkedList.head = node;
    }

    linkedList.rearrange();

    return linkedList;
  }
}

export default LinkedList;
