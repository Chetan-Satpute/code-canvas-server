import {Frame, createFrame} from './frame.js';
import Canvas from './index.js';
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

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  fadeIn(canvas: Canvas) {
    for (let i = this.opacity; i <= 1; i += 0.05) {
      this.opacity = i;
      canvas.pushFrame();
    }

    this.opacity = 1;
    canvas.pushFrame();
  }

  fadeOut(canvas: Canvas) {
    for (let i = this.opacity; i >= 0; i -= 0.05) {
      this.opacity = i;
      canvas.pushFrame();
    }

    this.opacity = 0;
    canvas.pushFrame();
  }

  static random() {
    return new Structure();
  }

  static fromData(_data: string) {
    return new Structure();
  }
}

export default Structure;
