import {StructureName} from './lib.js';

const structureNames = Object.values(StructureName);

export function isStructureName(value: string): value is StructureName {
  return structureNames.includes(value as StructureName);
}
