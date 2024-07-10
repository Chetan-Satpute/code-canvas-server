import {AlgorithmFunctionType} from '../../types.js';
import LinkedList from '../index.js';

const set: AlgorithmFunctionType = (_canvas, structure, args) => {
  const list = structure as LinkedList;
  const values = args.values as number[];

  list.head = LinkedList.fromData(`[${values.reverse().toString()}]`).head;
};

export default set;
