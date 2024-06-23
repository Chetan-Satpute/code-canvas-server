import BinarySearchTree from './binarySearchTree/index.js';
import NodeArray from './nodeArray/index.js';
import Structure from './structure.js';

export enum StructureName {
  Array = 'array',
  BinarySearchTree = 'binary-search-tree',
  LinkedList = 'linked-list',
  MaxHeap = 'max-heap',
}

export function getRandomStructureByName(
  structureName: StructureName
): Structure {
  switch (structureName) {
    case StructureName.Array:
      return NodeArray.random();
    case StructureName.BinarySearchTree:
      return BinarySearchTree.random();
    case StructureName.LinkedList:
    case StructureName.MaxHeap:
    default:
      return new Structure();
  }
}
