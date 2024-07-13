import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import LinkedList, {LinkedListNode} from '../index.js';

const removeNodeAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  args
) => {
  const list = structure as LinkedList;
  const nodeValue = args.nodeValue as number;

  removeNode(canvas, list, nodeValue);
};

function removeNode(canvas: Canvas, list: LinkedList, nodeValue: number) {
  canvas.pushStack(`removeNode(list, nodeValue=${nodeValue})`);
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  if (!list.head) {
    canvas.pushStep([2]);
    canvas.pushStep([32]);
    return;
  }

  canvas.pushStep([5]);
  if (list.head.value === nodeValue) {
    const node = list.head;
    node.color = Color.Error;
    node.label.top = undefined;
    canvas.addStructure(node);

    list.moveTo(list.x + LinkedListNode.WIDTH * 2, list.y);
    list.head = list.head.nextNode;
    list.rearrange();
    canvas.pushStep([6]);

    canvas.pushStep([8]);
    if (list.head) {
      list.head.shrinkPreviousEdge(canvas);
      list.head.previousNode = null;
      canvas.pushStep([9]);
    }

    node.fadeOut(canvas);
    for (let i = 0; i < LinkedListNode.WIDTH * 2; i++) {
      list.moveTo(list.x - 1, list.y);
      list.rearrange();
      canvas.pushFrame();
    }
    canvas.pushStep([12]);
    canvas.pushStep([32]);
    return;
  }

  let ptr = list.head;
  ptr.color = Color.Primary;
  canvas.pushStep([15]);

  canvas.pushStep([17]);
  while (ptr.nextNode && ptr.nextNode.value !== nodeValue) {
    ptr.color = Color.Transparent;
    ptr = ptr.nextNode;
    ptr.color = Color.Primary;
    canvas.pushStep([18]);

    canvas.pushStep([17]);
  }

  canvas.pushStep([21]);
  if (!ptr.nextNode) {
    canvas.pushStep([22]);
    canvas.pushStep([32]);
    return;
  }

  const node = ptr.nextNode;
  node.color = Color.Error;
  for (let i = 0; i < LinkedListNode.HEIGHT * 2; i++) {
    node.moveTo(node.x, node.y + 1);
    canvas.pushFrame();
  }
  canvas.pushStep([25]);

  canvas.pushStep([27]);
  if (node.nextNode) {
    node.nextNode.shrinkPreviousEdge(canvas);
    node.nextNode.previousNode = null;
    canvas.pushStep([28]);
  }

  ptr.shrinkNextEdge(canvas);
  ptr.nextNode = node.nextNode;
  ptr.growNextEdge(canvas);
  canvas.pushStep([31]);

  canvas.pushStep([33]);
  if (node.nextNode) {
    node.nextNode.previousNode = ptr;
    node.nextNode.growPreviousEdge(canvas);
    canvas.pushStep([34]);
  }

  const allNextNodes: LinkedListNode[] = [];
  let temp = ptr.nextNode;
  while (temp) {
    allNextNodes.push(temp);
    temp = temp.nextNode;
  }

  for (let i = 0; i < LinkedListNode.WIDTH * 2; i++) {
    for (const n of allNextNodes) n.moveTo(n.x - 1, n.y);
    canvas.pushFrame();
  }
  canvas.pushStep([37]);

  ptr.color = Color.Transparent;
  canvas.pushStep([38]);
  return;
}

export const removeNodeCode = `function removeNode(list, nodeValue) {
  if (!list.head) {
    return;
  }

  if (list.head.value === nodeValue) {
    list.head = list.head.next;

    if (list.head) {
      list.head.previous = null;
    }

    return;
  }

  let ptr = list.head;

  while (ptr.next && ptr.next.value !== node.value) {
    ptr = ptr.next;
  }

  if (!ptr.next) {
    return;
  }

  const node = ptr.next;

  node.next.previous = null;
  ptr.next = node.next;
  node.next.previous = ptr;

  return;
}`;

export default removeNodeAlgorithmFunction;
