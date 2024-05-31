import { useLocation, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import s from './GoBackButton.module.css';

export default function GoBackButton() {
  const location = useLocation();

  return (
    <Link to={location?.state?.from ?? '/'} className={s.link}>
      <FaArrowLeft className={s.icon} />
      Go back
    </Link>
  );
}
