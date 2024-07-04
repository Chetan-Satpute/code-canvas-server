import Node from '../../node/index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const setArray: AlgorithmFunctionType = (_canvas, structure, args) => {
  const nodeArray = structure as NodeArray;
  const values = args.values as number[];

  nodeArray.array = values.map(v => new Node(v));
  nodeArray.rearrange();
};

export default setArray;
