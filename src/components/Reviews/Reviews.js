import PropTypes from 'prop-types';
import Notification from '../Notification';
import s from './Reviews.module.css';

export default function Reviews({ reviews }) {
  return reviews.results.length === 0 ? (
    <Notification message="We don't have any reviews for this movie." />
  ) : (
    <ul className={s.list}>
      {reviews.results.map(({ id, author, content }) => (
        <li className={s.item} key={id}>
          <h3 className={s.title}>{`Author: ${author}`}</h3>
          <p className={s.text}>{content}</p>
        </li>
      ))}
    </ul>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ),
  }),
};
