import PropTypes from 'prop-types';
import Notification from '../components/Notification';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import * as theMovieDbAPI from '../services/themoviedb-api';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default function Reviews({ reviews }) {
  // const { movieId } = useParams();
  // const [reviews, setReviews] = useState(null);
  // const [error, setError] = useState(null);
  // const [status, setStatus] = useState(Status.IDLE);

  // useEffect(() => {
  //   setStatus(Status.PENDING);

  //   theMovieDbAPI
  //     .fetchMovieReviewsById(movieId)
  //     .then(({ results }) => {
  //       if (results.length === 0) {
  //         return Promise.reject(new Error(`Нет отзывов на этот фильм`));
  //       }

  //       setReviews(results);
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
  //       {reviews.map(review => (
  //         <li key={review.id}>
  //           <h2>Автор: {review.author}</h2>
  //           <p>{review.content}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  // if (reviews.results.length === 0) {
  //   return <Notification message="We don't have any reviews for this movie." />;
  // }

  return reviews.results.length === 0 ? (
    <Notification message="We don't have any reviews for this movie." />
  ) : (
    <ul className="reviews">
      {reviews.results.map(({ id, author, content }) => (
        <li className="reviewsItem" key={id}>
          <h4 className="reviewAuthor">{`Author: ${author}`}</h4>
          <p className="reviewContent">{content}</p>
        </li>
      ))}
    </ul>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
    ).isRequired,
  }).isRequired,
};
