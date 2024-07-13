import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import LinkedList, {LinkedListNode} from '../index.js';

const insertAfterAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const list = structure as LinkedList;
  const value = args.value as number;
  const nodeValue = args.nodeValue as number;

  insertAfter(canvas, list, value, nodeValue);
};

function insertAfter(
  canvas: Canvas,
  list: LinkedList,
  value: number,
  nodeValue: number
) {
  canvas.pushStack(`insertAfter(list, value=${value}, nodeValue=${nodeValue})`);
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  if (!list.head) {
    canvas.pushStep([2]);
    list.head = new LinkedListNode(value);

    canvas.pushStep([3]);
    canvas.pushStep([32]);
    return;
  }

  let ptr = list.head;
  ptr.color = Color.Primary;
  canvas.pushStep([6]);

  canvas.pushStep([8]);
  while (ptr.nextNode) {
    canvas.pushStep([9]);
    if (ptr.value === nodeValue) {
      canvas.pushStep([10]);
      break;
    }

    ptr.color = Color.Transparent;
    ptr = ptr.nextNode;
    ptr.color = Color.Primary;
    canvas.pushStep([13]);

    canvas.pushStep([8]);
  }

  const node = new LinkedListNode(value);
  node.nextEdgePercent = 0;
  node.previousEdgePercent = 0;
  node.color = Color.Success;
  node.moveTo(
    ptr.x + LinkedListNode.WIDTH * 2,
    ptr.y + LinkedListNode.HEIGHT * 2
  );
  canvas.addStructure(node);
  canvas.pushStep([16]);

  node.nextNode = ptr.nextNode;
  node.growNextEdge(canvas);

  const allNextNodes: LinkedListNode[] = [];
  let temp = node.nextNode;
  while (temp) {
    allNextNodes.push(temp);
    temp = temp.nextNode;
  }

  for (let i = 0; i < LinkedListNode.WIDTH * 2; i++) {
    for (const n of allNextNodes) n.moveTo(n.x + 1, n.y);
    canvas.pushFrame();
  }
  canvas.pushStep([18]);

  canvas.pushStep([20]);
  if (node.nextNode) {
    node.nextNode.shrinkPreviousEdge(canvas);
    node.nextNode.previousNode = null;
    canvas.pushStep([21]);
  }

  if (ptr.nextNode) ptr.shrinkNextEdge(canvas);
  ptr.nextNode = node;
  canvas.removeStructure(node);
  ptr.growNextEdge(canvas);
  canvas.pushStep([24]);

  node.previousNode = ptr;
  node.growPreviousEdge(canvas);
  canvas.pushStep([25]);

  canvas.pushStep([27]);
  if (node.nextNode) {
    node.nextNode.previousNode = node;
    node.nextNode.growPreviousEdge(canvas);
    canvas.pushStep([28]);
  }

  for (let i = 0; i < LinkedListNode.HEIGHT * 2; i++) {
    node.moveTo(node.x, node.y - 1);
    canvas.pushFrame();
  }
  canvas.pushStep([31]);

  ptr.color = Color.Transparent;
  node.color = Color.Transparent;
  canvas.pushStep([32]);
  return;
}

export const insertAfterCode = `function insertAfter(list, value, nodeValue) {
  if (!list.head) {
    list.head = new LinkedListNode(value));
    return;
  }

  let ptr = list.head;

  while (ptr.next) {
    if (ptr.value === nodeValue) {
      break;
    }

    ptr = ptr.next;
  }

  const node = new LinkedListNode(value);

  node.next = ptr.next;

  if (node.next) {
    node.next.previous = null;
  }

  ptr.next = node;
  node.previous = ptr;

  if (node.next) {
    node.next.previous = node;
  }

  return;
}`;

export default insertAfterAlgorithmFunction;
