import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/photo.png';
import style from './Users.module.css';

/* Презентационная компонента, только принимает пропсы и возвращает jsx разметку - чистая функция*/

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div className={style.users} >
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="avatar"
              className={style.userPhoto} />
          </NavLink>
        </div>
        <div>
          {user.followed
            ? <button disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => { unfollow(user.id); }}>
              Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => { follow(user.id); }}>
              Follow</button>}
        </div>
      </span>
      <span>
        <span>
          <div><strong>nickname:</strong> {user.name}</div>
          <div>{user.status}</div>
        </span>
        {/* <span>
          <div>{"u.location.country"}</div>
          <div>{"u.location.city"}</div>
        </span> */}
      </span>
    </div>)
};

export default User;