import * as theMovieDbAPI from '../../services/themoviedb-api';
import s from './Description.module.css';

export default function Description({
  posterPath,
  title,
  releaseDate,
  voteAverage,
  overview,
  genres,
}) {
  return (
    <div className={s.descr}>
      <img
        className={s.poster}
        src={`${theMovieDbAPI.IMAGE_BASE_URL}${posterPath}`}
        alt={title}
        width="354"
      />
      <div className={s.container}>
        <h1 className={s.originalTitle}>{`${title} (${new Date(
          releaseDate,
        ).getFullYear()})`}</h1>
        <p className={s.text}>{`User Score: ${Math.round(
          voteAverage * 10,
        )}%`}</p>
        <h2 className={s.title}>Overview</h2>
        <p className={s.text}>{overview}</p>
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
  );
}
