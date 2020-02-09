import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/photo.png';
import style from './Users.module.css';

/* Презентационная компонента, только принимает пропсы и возвращает jsx разметку - чистая функция*/

let Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pagesSize);
  let pages = [];
  for(let i=1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={style.pagination}>
        {pages.map( p => {

          return <span className={ props.currentPage === p && style.selectedPage }
                        onClick={(e) => { props.onPageChanged(p); }}>{p}</span>
                        })}
      </div>
      {
        props.users.map(u =>
          <div className={style.users} key={u.id}>
            <span>
              <div>
                <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="avatar"
                     className={style.userPhoto} />
                </NavLink>
              </div>
              <div>
                {u.followed
                  ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                            onClick={() => { props.unfollow(u.id);}}>
                    Unfollow</button>
                  : <button disabled={props.followingInProgress.some(id => id === u.id)}
                            onClick={() => { props.follow(u.id);}}>
                    Follow</button>}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
              </span>
            </span>
          </div>)
      }
    </div>
  )
};

export default Users;