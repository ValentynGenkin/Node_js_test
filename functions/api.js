import express from 'express';
import serverless from 'serverless-http';

import router from '../routes/movies.js';
import { getIndexPage, wrongRoute } from '../controllers/movieController.js';

const app = express();

app.use(express.json());

app.use('/movie', router);

app.get('/', getIndexPage);

app.all('/*', wrongRoute);

app.use('/api/', router);
export const handler = serverless(api);
