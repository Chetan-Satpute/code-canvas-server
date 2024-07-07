import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const sortArray: AlgorithmFunctionType = (_canvas, structure, _args) => {
  const nodeArray = structure as NodeArray;

  nodeArray.array.sort((a, b) => a.value - b.value);
  nodeArray.rearrange();
};

export default sortArray;
