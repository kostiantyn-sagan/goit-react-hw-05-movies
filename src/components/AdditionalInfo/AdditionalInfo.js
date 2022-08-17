import { useRouteMatch, useLocation, NavLink } from 'react-router-dom';
import { FaFilm, FaRegComments } from 'react-icons/fa';
import s from './AdditionalInfo.module.css';

export default function AdditionalInfo() {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <h3 className={s.title}>Additional information</h3>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            className={s.link}
            to={{
              pathname: `${url}/cast`,
              state: { from: location?.state?.from },
            }}
          >
            <FaFilm className={s.icon} size="16px" />
            Cast
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            className={s.link}
            to={{
              pathname: `${url}/reviews`,
              state: { from: location?.state?.from },
            }}
          >
            <FaRegComments className={s.icon} size="16px" />
            Reviews
          </NavLink>
        </li>
      </ul>
    </>
  );
}
