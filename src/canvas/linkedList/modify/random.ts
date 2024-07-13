import {randomNumber, randomNumberArray} from '../../../utils/number.js';
import {AlgorithmFunctionType} from '../../types.js';
import LinkedList, {LinkedListNode} from '../index.js';

const random: AlgorithmFunctionType = (_canvas, structure, _args) => {
  const list = structure as LinkedList;

  const arrayLength = randomNumber(3, 8);
  const numberArray = randomNumberArray(arrayLength, 0, 100);

  list.head = new LinkedListNode(randomNumber(0, 100));

  for (const value of numberArray) {
    const node = new LinkedListNode(value);

    node.nextNode = list.head;
    list.head.previousNode = node;
    list.head = node;
  }

  list.rearrange();
};

export default random;
