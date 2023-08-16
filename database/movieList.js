export let movieList = [
  {
    id: 'bf7d37f5-3a70-44dc-8be9-fef86f52d6e9',
    title: 'The Matrix',
    director: 'Larry Wachowski, Andy Wachowski',
    release_date: '1999-03-31',
  },
  {
    id: 'eecfa968-87bb-46e2-a6a9-9c0ec5f11d52',
    title: 'Inception',
    director: 'Christopher Nolan',
    release_date: '2010-07-16',
  },
  {
    id: 'd7504fc0-a46d-4e99-8d0d-38b603788473',
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    release_date: '1994-10-14',
  },
  {
    id: '5593b4e2-e154-4a13-8e64-a0495ef7d056',
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    release_date: '1994-09-23',
  },
  {
    id: 'a84e6a03-9ce1-4909-9ff8-3fd456588583',
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    release_date: '1994-07-06',
  },
];

/* 
In js, you cannot change imported variables, regardless of how they are declared (const or let). 
However, these variables can be changed in the module that exports them.
Because of this, I manipulate data (delete data) in this module.
*/

export const deleteMovie = (req, res) => {
  const { id } = req.params;

  if (id.length < 36) res.status(400).json({ msg: 'Invalid ID' });
  else {
    const updatedMovieList = movieList.filter((movie) => movie.id !== id);

    if (updatedMovieList.length === movieList.length) {
      res.status(404).json({ msg: `Movie with id ${id} not found` });
    } else {
      movieList = updatedMovieList;
      res.status(200).json({ msg: `Movie with id ${id} deleted` });
    }
  }
};
