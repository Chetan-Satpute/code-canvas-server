import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import LinkedList, {LinkedListNode} from '../index.js';
import {Color} from '../../color.js';

const insertHeadAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const list = structure as LinkedList;
  const value = args.value as number;

  insertHead(canvas, list, value);
};

function insertHead(canvas: Canvas, list: LinkedList, value: number) {
  canvas.pushStack(`insertHead(list, value=${value})`);
  canvas.pushStep([0]);

  const node = new LinkedListNode(value);
  node.x = list.x;
  node.y = list.y + LinkedListNode.HEIGHT * 2;
  node.color = Color.Success;
  node.nextEdgePercent = 0;
  node.previousEdgePercent = 0;
  canvas.addStructure(node);
  canvas.pushStep([1]);

  canvas.pushStep([3]);
  if (!list.head) {
    list.head = node;
    list.moveTo(list.x, list.y + LinkedListNode.HEIGHT * 2);
    list.rearrange();
    canvas.pushStep([4]);

    for (let i = 0; i < LinkedListNode.HEIGHT * 2; i++) {
      list.moveTo(list.x, list.y - 1);
      list.rearrange();
      canvas.pushFrame();
    }
    canvas.pushStep([5]);
    node.color = Color.Transparent;
    canvas.pushStep([14]);
    return;
  }

  for (let i = 0; i < LinkedListNode.WIDTH * 2; i++) {
    list.moveTo(list.x + 1, list.y);
    list.rearrange();
    canvas.pushFrame();
  }

  for (let i = 0; i < LinkedListNode.HEIGHT * 2; i++) {
    node.moveTo(node.x, node.y - 1);
    canvas.pushFrame();
  }

  node.nextNode = list.head;
  node.growNextEdge(canvas);
  canvas.pushStep([8]);

  list.head.previousNode = node;
  list.head.growPreviousEdge(canvas);
  canvas.pushStep([9]);

  list.head = node;
  list.moveTo(list.x - LinkedListNode.WIDTH * 2, list.y);
  list.rearrange();
  canvas.removeStructure(node);
  canvas.pushStep([11]);

  canvas.pushStep([13]);
  node.color = Color.Transparent;
  canvas.pushStep([14]);
  return;
}

export const insertHeadCode = `function insertHead(list, value) {
  const node = new LinkedListNode(value);

  if (!list.head) {
    list.head = node;
    return;
  }

  node.next = list.head;
  list.head.previous = node;

  list.head = node;

  return;
}`;

export default insertHeadAlgorithmFunction;
