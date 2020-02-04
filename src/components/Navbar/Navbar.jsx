import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="/profile" activeClassName={style.activeLink}>Profile</NavLink>
        </li>
        <li>
          <NavLink to="/dialogs" activeClassName={style.activeLink}>Dialogs</NavLink>
        </li>
        <li className={style.users}>
          <NavLink to="/users" activeClassName={style.activeLink}>Users</NavLink>
        </li>
        <li>
          <NavLink to="/news" activeClassName={style.activeLink}>News</NavLink>
        </li>
        <li>
          <NavLink to="/musics" activeClassName={style.activeLink}>Musics</NavLink>
        </li>
        <li className={style.settings}>
          <NavLink to="/settings" activeClassName={style.activeLink}>Settings</NavLink>
        </li>
        <li className={style.friends}>
          <NavLink to="/friends" activeClassName={style.activeLink}>Friends</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;