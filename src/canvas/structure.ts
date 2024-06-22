import {Frame, createFrame} from './frame.js';

class Structure {
  canvasId: number | null;
  opacity: number;

  x: number;
  y: number;

  constructor() {
    this.canvasId = null;

    this.x = 0;
    this.y = 0;
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
}

export default Structure;
