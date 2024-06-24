import {Router} from 'express';
import {isStructureName} from '../canvas/utils.js';
import {getFunctionSectionByName} from '../canvas/lib.js';

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

export default router;
