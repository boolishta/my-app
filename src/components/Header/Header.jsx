import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return <header className={style.header}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxC-kD5G52HKT_77FReRlnrzyC3evVDiQeQ3_bePkQwPje2pZTuQ&s" alt="Logo"></img>
        <p>Header</p>

        <div className={style.loginBlock}>
          <NavLink to={'/login'}>Login</NavLink>
        </div>
      </header>
}

export default Header;