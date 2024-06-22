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

      node.label = {};
      node.label.top = index.toString();

      x += Node.WIDTH;
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
}

export default NodeArray;
