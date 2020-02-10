import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return <header className={style.header}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxC-kD5G52HKT_77FReRlnrzyC3evVDiQeQ3_bePkQwPje2pZTuQ&s" alt="Logo"></img>
        <p>My Social Network</p>
        <div className={style.loginBlock}>
          { props.isAuth ? props.login
            : <NavLink to={'/login'}>Login OUT</NavLink> }
        </div>
      </header>
}

export default Header;