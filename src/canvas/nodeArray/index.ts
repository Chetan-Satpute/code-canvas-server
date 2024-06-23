import {randomNumber, randomNumberArray} from '../../utils/number.js';
import {Frame} from '../frame.js';
import Node from '../node/index.js';
import Structure from '../structure.js';

class NodeArray extends Structure {
  array: Node[];

  constructor() {
    super();

    this.array = [];
  }

  rearrange(): void {
    let x = this.x;
    const y = this.y;

    for (let index = 0; index < this.array.length; index++) {
      const node = this.array[index];

      node.x = x;
      node.y = y;

      node.corners = 0b0000;

      node.label = {};
      node.label.top = index.toString();

      x += Node.WIDTH;
    }

    if (this.array.length > 0) {
      this.array[0].corners |= 0b1001;
      this.array[this.array.length - 1].corners |= 0b0110;
    }
  }

  toFrame(frame?: Frame): Frame {
    frame = super.toFrame(frame);

    for (const node of this.array) node.toFrame(frame);

    return frame;
  }

  toData(): string {
    const numArray = this.array.map(node => node.value);
    return `[${numArray}]`;
  }

  static random(): NodeArray {
    const arrayLength = randomNumber(1, 10);
    const numberArray = randomNumberArray(arrayLength, 0, 100);

    const nodeArray = new NodeArray();
    nodeArray.array = numberArray.map(num => new Node(num));

    nodeArray.rearrange();

    return nodeArray;
  }
}

export default NodeArray;
