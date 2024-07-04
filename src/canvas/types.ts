import Canvas from './index.js';
import Structure from './structure.js';

export interface Point {
  x: number;
  y: number;
}

export enum FunctionArgumentType {
  Number = 'number',
  NumberArray = 'number[]',
}

export interface FunctionParameter {
  label: string;
  placeholder: string;
  supportingText: string;
  argumentType: FunctionArgumentType;
}

export type FunctionArgument = number | number[];

export interface FunctionInfo {
  id: string;
  name: string;
  parameters: FunctionParameter[];
  animated: boolean;
}

export interface FunctionSection {
  title: string;
  functions: FunctionInfo[];
}

export type AlgorithmFunctionType = (
  canvas: Canvas,
  struct: Structure,
  args: Record<string, FunctionArgument>
) => void;
