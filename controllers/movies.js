const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  const ownerId = req.user._id;

  Movie.find({ owner: ownerId })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    id,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    id,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Запрашиваемый фильм не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нет прав для совершения данного действия');
      } else {
        return movie.deleteOne();
      }
    })
    .then(() => res.status(200).send({ message: 'Фильм удален' }))
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
