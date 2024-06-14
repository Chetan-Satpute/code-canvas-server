import {Router} from 'express';

const router = Router();

router.get('/', (_, res) => res.send({message: 'Code canvas server'}));

export default router;
