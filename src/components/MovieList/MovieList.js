import PropTypes from 'prop-types';
import MovieListItem from '../MovieListItem';
import s from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <ul className={s.list}>
      {movies.map(({ id, backdrop_path, title, release_date }) => (
        <MovieListItem
          key={id}
          id={id}
          backdropPath={backdrop_path}
          title={title}
          releaseDate={release_date}
        />
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }),
  ),
};
