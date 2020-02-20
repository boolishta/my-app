import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

/* Презентационная компонента, только принимает пропсы и возвращает jsx разметку - чистая функция*/

let Users = ({currentPage, onPageChanged, pagesSize, users, totalUsersCount, ...props}) => {
  
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pagesSize={pagesSize}/>
      { users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow}/>) }
    </div>
  )
};

export default Users;