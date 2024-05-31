import PropTypes from 'prop-types';
import * as theMovieDbAPI from '../../services/themoviedb-api';
import s from './Cast.module.css';
import defaultImage from './default-portrait.jpg';

export default function Cast({ credits }) {
  return (
    <ul className={s.list}>
      {credits.cast.map(({ id, profile_path, name, character }) => (
        <li className={s.item} key={id}>
          <img
            src={
              profile_path
                ? `${theMovieDbAPI.IMAGE_BASE_URL}${profile_path}`
                : defaultImage
            }
            alt={name}
            width="270"
          />
          <div className={s.container}>
            <h3 className={s.title}>{name}</h3>
            <p className={s.text}>{`Character: ${character}`}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

Cast.propTypes = {
  credits: PropTypes.shape({
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        profile_path: PropTypes.string,
        name: PropTypes.string.isRequired,
        character: PropTypes.string.isRequired,
      }),
    ),
  }),
};
