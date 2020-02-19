import React from 'react';
import style from './Paginator.module.css';

/* Презентационная компонента, только принимает пропсы и возвращает jsx разметку - чистая функция*/

let Paginator = ({ totalUsersCount, pagesSize, currentPage, onPageChanged }) => {

  let pagesCount = Math.ceil(totalUsersCount / pagesSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={style.pagination}>
      {pages.map(p => {
        return <span className={currentPage === p && style.selectedPage}
          onClick={(e) => { onPageChanged(p); }}>{p}</span>
      })}
    </div>
  )
};

export default Paginator;