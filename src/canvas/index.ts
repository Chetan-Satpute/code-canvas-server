import {numberIdGenerator} from '../utils/number.js';
import {createFrame} from './frame.js';
import {Step, createStep} from './step.js';
import Structure from './structure.js';

class Canvas {
  structures: Record<number, Structure>;
  steps: Step[];
  currentStep: Step;

  createCanvasId: () => number;

  constructor() {
    this.structures = {};
    this.steps = [];
    this.currentStep = createStep();

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

  pushFrame() {
    const frame = createFrame();

    for (const structure of Object.values(this.structures)) {
      structure.toFrame(frame);
    }

    this.currentStep.frames.push(frame);
  }

  pushStep(hlLines: number[]) {
    this.pushFrame();
    this.currentStep.hlLines = hlLines;
    this.currentStep.callStack.reverse();
    this.steps.push(this.currentStep);

    const step = createStep();
    step.callStack = [...this.currentStep.callStack];

    this.currentStep = step;
  }

  pushStack(signature: string) {
    this.currentStep.callStack.push(signature);
  }
}

export default Canvas;
