import PropTypes from 'prop-types';
import s from './Notification.module.css';

export default function Notification({ message }) {
  return <p className={s.text}>{message}</p>;
}

Notification.propTypes = {
  //   reviews: PropTypes.shape({
  //     results: PropTypes.arrayOf(
  //       PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  //     ).isRequired,
  //   }).isRequired,
};
