import {Point} from './types.js';

export interface CanvasNode {
  x: number;
  y: number;

  corners: number;
  value: number;
  color: string;
  opacity: number;
}

export enum EdgeType {
  DIRECTED = 'DIRECTED',
  UNDIRECTED = 'UNDIRECTED',
  BIDIRECTED = 'BIDIRECTED',
}

export interface CanvasEdge {
  startNodePosition: Point;
  endNodePosition: Point;

  percent: number;
  type: EdgeType;
  opacity: number;
}

export enum LabelPosition {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom',
}

export interface CanvasLabel {
  nodePosition: Point;
  position: LabelPosition;
  text: string;
  opacity: number;
}

export interface Frame {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  labels: CanvasLabel[];
}

export function createFrame(): Frame {
  return {nodes: [], edges: [], labels: []};
}
