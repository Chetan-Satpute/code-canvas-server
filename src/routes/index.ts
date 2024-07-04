import {Router} from 'express';
import functionRouter from './function.js';
import stepsRouter from './steps.js';
import structureRouter from './structure.js';

const router = Router();

router.get('/', (_, res) => res.send({message: 'Code canvas server'}));
router.use('/function', functionRouter);
router.use('/steps', stepsRouter);
router.use('/structure', structureRouter);

export default router;
