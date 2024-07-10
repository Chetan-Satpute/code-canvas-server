import {Color} from '../../color.js';
import Canvas from '../../index.js';
import {AlgorithmFunctionType} from '../../types.js';
import LinkedList, {LinkedListNode} from '../index.js';

const removeHeadAlgorithmFunction: AlgorithmFunctionType = (
  canvas,
  structure,
  _args
) => {
  const list = structure as LinkedList;

  removeHead(canvas, list);
};

function removeHead(canvas: Canvas, list: LinkedList) {
  canvas.pushStack('removeHead(list)');
  canvas.pushStep([0]);

  canvas.pushStep([1]);
  if (!list.head) {
    canvas.pushStep([2]);
    canvas.pushStep([12]);
    return;
  }

  const node = list.head;
  node.color = Color.Error;
  node.label.top = undefined;
  canvas.addStructure(node);

  list.moveTo(list.x + LinkedListNode.WIDTH * 2, list.y);
  list.head = list.head.nextNode;
  list.rearrange();
  canvas.pushStep([5]);

  canvas.pushStep([7]);
  if (list.head) {
    list.head.shrinkPreviousEdge(canvas);
    list.head.previousNode = null;
    canvas.pushStep([8]);
  }

  node.fadeOut(canvas);
  for (let i = 0; i < LinkedListNode.WIDTH * 2; i++) {
    list.moveTo(list.x - 1, list.y);
    list.rearrange();
    canvas.pushFrame();
  }
  canvas.pushStep([11]);
  canvas.pushStep([12]);
  return;
}

export const removeHeadCode = `function removeHead(list) {
  if (!list.head) {
    return;
  }

  list.head = list.head.next;

  if (list.head) {
    list.head.previous = null;
  }

  return;
}`;

export default removeHeadAlgorithmFunction;
