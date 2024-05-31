import { useRouteMatch, useLocation, NavLink } from 'react-router-dom';
import { FaUsers, FaRegComments } from 'react-icons/fa';
import s from './MovieSubNav.module.css';

export default function MovieSubNav() {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <h2 className={s.title}>Additional information</h2>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            className={s.link}
            to={{
              pathname: `${url}/cast`,
              state: { from: location?.state?.from },
            }}
          >
            <FaUsers className={s.icon} />
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
            <FaRegComments className={s.icon} />
            Reviews
          </NavLink>
        </li>
      </ul>
    </>
  );
}
