import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as theMovieDbAPI from '../../services/themoviedb-api';
import defaultImage from './default-normal.jpg';
import s from './MovieListItem.module.css';

export default function MovieListItem({
  id,
  backdropPath,
  title,
  releaseDate,
}) {
  const location = useLocation();

  return (
    <li className={s.item}>
      <Link
        className={s.link}
        to={{ pathname: `/movies/${id}`, state: { from: location } }}
      >
        <img
          src={
            backdropPath
              ? `${theMovieDbAPI.IMAGE_BASE_URL}${backdropPath}`
              : defaultImage
          }
          alt={title}
          width="270"
        />
        <div className={s.box}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.text}>
            {new Date(releaseDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
      </Link>
    </li>
  );
}

MovieListItem.propTypes = {
  // movies: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //   }).isRequired,
  // ).isRequired,
};
