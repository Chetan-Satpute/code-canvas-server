import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import {NODE_ENV} from './constants/env.js';
import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use('/', router);

export default app;
