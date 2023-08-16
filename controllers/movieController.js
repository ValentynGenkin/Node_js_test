import { v4 as uuid } from 'uuid';
import { movieList } from '../database/movieList.js';

export const getIndexPage = (req, res) => {
  res.end(`<p>Welcome to the Movie API<br>
  <h3>Objects</h3>
  GET /movie - List of movies<br>
  POST /movie - Add movie to the list<br>
  POST request body: <br>
  {<br>
    "title": "title",<br>
    "director": "name",<br>
    "release_date": "date"<br>
  } <br>
  GET /movie/:id - Get movie by ID<br>
  DELETE /movie/:id - Delete movie by ID</p>`);
};

export const getMovieList = (req, res) => {
  res.status(200).json(movieList);
};

export const postMovie = (req, res) => {
  const { title, director, release_date } = req.body;
  const id = uuid();

  const movieCheck = movieList.some((movie) => movie.title === title);

  if (movieCheck) {
    return res
      .status(409)
      .json({ msg: `Movie with title '${title}' already exist` });
  }
  if (!title || !director || !release_date) {
    return res
      .status(400)
      .json({ msg: 'Error, all fields are required. Check request body' });
  }

  movieList.push({ id, title, director, release_date });
  res.status(200).json({ msg: `Movie '${title}' added with id - ${id}` });
};

export const getMovieByID = (req, res) => {
  const { id } = req.params;

  const foundMovie = movieList.filter((movie) => movie.id === id);

  if (id.length < 36) {
    return res.status(400).json({ msg: 'Invalid ID' });
  }

  if (foundMovie.length === 0) {
    return res.status(404).json({ msg: `Movie with id ${id} not found` });
  }

  return res.status(200).json(foundMovie);
};

export const wrongRoute = (req, res) => {
  res
    .status(404)
    .json({ msg: `Route ${req.method} ${req.url} does not exist` });
};
