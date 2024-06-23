import {Router} from 'express';
import {isStructureName} from '../canvas/utils.js';
import {getRandomStructureByName} from '../canvas/lib.js';

const router = Router();

router.route('/:structureName').get((req, res) => {
  const {structureName} = req.params;

  if (!isStructureName(structureName)) {
    res.statusCode = 404;
    return res.send({message: 'Structure not found!'});
  }

  const structure = getRandomStructureByName(structureName);
  const structureFrame = structure.toFrame();
  const structureData = structure.toData();

  res.send({frame: structureFrame, data: structureData});
});

export default router;
