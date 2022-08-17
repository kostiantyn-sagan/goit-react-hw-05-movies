// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as theMovieDbAPI from '../services/themoviedb-api';
import defaultImage from './default-portrait.jpg';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default function Cast({ credits }) {
  // const { movieId } = useParams();
  // const [cast, setCast] = useState(null);
  // const [error, setError] = useState(null);
  // const [status, setStatus] = useState(Status.IDLE);

  // useEffect(() => {
  //   setStatus(Status.PENDING);

  //   theMovieDbAPI
  //     .fetchMovieCreditsById(movieId)
  //     .then(({ cast }) => {
  //       setCast(cast);
  //       setStatus(Status.RESOLVED);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setStatus(Status.REJECTED);
  //     });
  // }, [movieId]);

  // if (status === Status.IDLE) {
  //   return null;
  // }

  // if (status === Status.PENDING) {
  //   return <p>Загружаем...</p>;
  // }

  // if (status === Status.REJECTED) {
  //   return <p>{error.message}</p>;
  // }

  // if (status === Status.RESOLVED) {
  //   return (
  //     <ul>
  //       {credits.cast.map(actor => (
  //         <li key={actor.id}>
  //           {actor.profile_path && (
  //             <img
  //               src={`${theMovieDbAPI.IMAGE_BASE_URL}${actor.profile_path}`}
  //               alt={actor.name}
  //             />
  //           )}
  //           <h2>{actor.name}</h2>
  //           <p>Character: {actor.character}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  return (
    <ul className="castList">
      {credits.cast.map(({ id, profile_path, name, character }) => (
        <li className="castItem" key={id}>
          <img
            src={
              profile_path
                ? `${theMovieDbAPI.IMAGE_BASE_URL}${profile_path}`
                : defaultImage
            }
            alt={name}
            width="270"
          />
          <div className="actorContent">
            <h4 className="actorName">{name}</h4>
            <p className="actorCharacter">{`Character: ${character}`}</p>
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
      }).isRequired,
    ).isRequired,
  }).isRequired,
};
