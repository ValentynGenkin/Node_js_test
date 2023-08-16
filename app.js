import express from 'express';

import router from './routes/movies.js';
import { getIndexPage, wrongRoute } from './controllers/movieController.js';

const app = express();

app.use(express.json());

app.use('/movie', router);

app.get('/', getIndexPage);

app.all('/*', wrongRoute);

export default app;
