import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className={style.navbar}>
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
        </ul>
      </nav>
      <div className={style.friends}>
        Friends:
        "отобразить best friends"
      </div>
    </div>
  );
}

export default Navbar;