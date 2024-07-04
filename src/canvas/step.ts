import {Frame} from './frame.js';

export interface Step {
  frames: Frame[];
  hlLines: number[];
  callStack: string[];
}

export function createStep(): Step {
  return {
    frames: [],
    hlLines: [],
    callStack: [],
  };
}
