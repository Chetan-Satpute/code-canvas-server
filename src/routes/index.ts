import {Router} from 'express';
import structureRouter from './structure.js';

const router = Router();

router.get('/', (_, res) => res.send({message: 'Code canvas server'}));
router.use('/structure', structureRouter);

export default router;
