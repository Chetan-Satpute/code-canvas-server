import {Router} from 'express';
import {isStructureName} from '../canvas/utils.js';
import {
  getAlgorithmFunction,
  getFunctionSectionByName,
  getStructureFromData,
} from '../canvas/lib.js';
import Canvas from '../canvas/index.js';
import {FunctionArgument} from '../canvas/types.js';

const router = Router();

router.route('/:structureName').get((req, res) => {
  const {structureName} = req.params;

  if (!isStructureName(structureName)) {
    res.statusCode = 404;
    return res.send({message: 'Structure not found!'});
  }

  const funcSections = getFunctionSectionByName(structureName);

  res.send({
    functionSections: funcSections,
  });
});

router.route('/:structureName/:functionId').post((req, res) => {
  const {structureName, functionId} = req.params;
  const {structureData, arguments: args} = req.body as {
    structureData: string;
    arguments: Record<string, FunctionArgument>;
  };
  console.log(structureData, req.body);

  if (!isStructureName(structureName)) {
    res.statusCode = 404;
    return res.send({message: 'Structure not found!'});
  }

  const algorithmFunction = getAlgorithmFunction(structureName, functionId);

  if (!algorithmFunction) {
    res.statusCode = 404;
    return res.send({message: 'Algorithm function not found!'});
  }

  const canvas = new Canvas();
  const structure = getStructureFromData(structureName, structureData);

  algorithmFunction(canvas, structure, args);

  const structureFrame = structure.toFrame();
  const updatedStructureData = structure.toData();

  res.send({
    frame: structureFrame,
    data: updatedStructureData,
  });
});

export default router;
