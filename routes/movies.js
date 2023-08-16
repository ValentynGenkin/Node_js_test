import express from 'express';
import {
  postMovie,
  getMovieList,
  getMovieByID,
} from '../controllers/movieController.js';
import { deleteMovie } from '../database/movieList.js';

const router = express.Router();

router.get('/', getMovieList);
router.post('/', postMovie);
router.get('/:id', getMovieByID);
router.delete('/:id', deleteMovie);

export default router;
