import PropTypes from 'prop-types';
import * as theMovieDbAPI from '../../services/themoviedb-api';
import MovieSubNav from '../MovieSubNav';
import s from './MovieCard.module.css';

export default function MovieCard({
  posterPath,
  title,
  releaseDate,
  voteAverage,
  overview,
  genres,
}) {
  return (
    <>
      <div className={s.descr}>
        <img
          className={s.poster}
          src={`${theMovieDbAPI.IMAGE_BASE_URL}${posterPath}`}
          alt={title}
          width="270"
        />
        <div className={s.container}>
          <h1 className={s.originalTitle}>{`${title} (${new Date(
            releaseDate,
          ).getFullYear()})`}</h1>
          <p className={s.text}>{`User Score: ${Math.round(
            voteAverage * 10,
          )}%`}</p>
          <h2 className={s.title}>Overview</h2>
          <p className={s.overview}>{overview}</p>
          <h2 className={s.title}>Genres</h2>
          <ul className={s.list}>
            {genres.map(({ id, name }) => (
              <li key={id} className={s.item}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <MovieSubNav />
    </>
  );
}

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};
