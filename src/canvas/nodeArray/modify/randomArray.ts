import {randomNumber, randomNumberArray} from '../../../utils/number.js';
import Node from '../../node/index.js';
import {AlgorithmFunctionType} from '../../types.js';
import NodeArray from '../index.js';

const randomArray: AlgorithmFunctionType = (_canvas, structure, args) => {
  const nodeArray = structure as NodeArray;

  const arrayLength = randomNumber(1, 10);
  const numberArray = randomNumberArray(arrayLength, 0, 100);

  nodeArray.array = numberArray.map(value => new Node(value));
  nodeArray.rearrange();
};

export default randomArray;
