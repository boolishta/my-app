import React from 'react';
import style from './Header.module.css';

const Header = () => {
  return <header className={style.header}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxC-kD5G52HKT_77FReRlnrzyC3evVDiQeQ3_bePkQwPje2pZTuQ&s" alt="Logo"></img>
        <p>Header</p>
      </header>
}

export default Header;