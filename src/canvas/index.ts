import {numberIdGenerator} from '../utils/number.js';
import Structure from './structure.js';

class Canvas {
  structures: Record<number, Structure>;

  createCanvasId: () => number;

  constructor() {
    this.structures = {};

    this.createCanvasId = numberIdGenerator();
  }

  addStructure(struct: Structure) {
    struct.canvasId = this.createCanvasId();
    this.structures[struct.canvasId] = struct;
  }

  removeStructure(struct: Structure) {
    if (struct.canvasId && this.structures[struct.canvasId])
      delete this.structures[struct.canvasId];
  }
}

export default Canvas;
