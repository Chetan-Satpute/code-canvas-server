import {Router} from 'express';
import localStore from '../localStore/index.js';

const router = Router();

router.get('/:runId', async (req, res) => {
  const {runId} = req.params;
  const pageString = req.query.page;

  let pageNumber = Number(pageString);
  if (Number.isNaN(pageNumber)) pageNumber = 0;

  const startStepIndex = pageNumber * 10;
  const endStepIndex = (pageNumber + 1) * 10 - 1;

  const rows = await localStore.getSteps(startStepIndex, endStepIndex, runId);
  const steps = rows.map(row => JSON.parse(row.data));

  const nextPage = steps.length < 10 ? undefined : pageNumber + 1;

  res.send({steps, nextPage});
});

export default router;
