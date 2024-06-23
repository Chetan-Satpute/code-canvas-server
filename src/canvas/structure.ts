import {Frame, createFrame} from './frame.js';
import Node from './node/index.js';

class Structure {
  canvasId: number | null;
  opacity: number;

  x: number;
  y: number;

  constructor() {
    this.canvasId = null;

    this.x = Node.WIDTH;
    this.y = Node.HEIGHT * 2;
    this.opacity = 1;
  }

  rearrange() {}

  toFrame(frame?: Frame): Frame {
    if (!frame) return createFrame();
    else return frame;
  }

  toData(): string {
    return '';
  }

  static random() {
    return new Structure();
  }
}

export default Structure;
