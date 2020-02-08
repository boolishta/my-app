import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/photo.png';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { usersAPI } from '../../api/api';

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
                  ? <button onClick={() => {

                    usersAPI.getUnfollow(u) //axios вынесли отдельной функцией в отдельный файл
                      .then(data => {
                        if(data.resultCode === 0) { //если мы залогинины то диспачим
                          props.unfollow(u.id)
                        }
                       });
                }}>Unfollow</button>
                  : <button onClick={() => {

                    usersAPI.getFollow(u)
                      .then(data => {
                        if(data.resultCode === 0) { //если мы залогинины то диспачим
                          props.follow(u.id);
                        }
                      });

                    }}>Follow</button>}
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