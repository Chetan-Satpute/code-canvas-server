import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import {NODE_ENV} from './constants/env.js';
import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use('/api', apiRouter);

export default app;
