import React from 'react';
import style from './Users.module.css';
<<<<<<< HEAD
<<<<<<< HEAD
import userPhoto from '../../assets/images/photo.png';
import { NavLink } from 'react-router-dom';

/* Презентационная компонента, только принимает пропсы и возвращает jsx разметку - чистая функция*/

let Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pagesSize);
  let pages = [];
  for(let i=1; i <= pagesCount; i++) {
    pages.push(i);
  }
=======
>>>>>>> parent of 813c485... checkpoint2
=======
>>>>>>> parent of 813c485... checkpoint2

let  Users  = (props) => {
  return (
    <div>
<<<<<<< HEAD
<<<<<<< HEAD
      <div className={style.pagination}>
        {pages.map( p => {

          return <span className= {props.currentPage === p && style.selectedPage}
                        onClick={(e) => { props.onPageChanged(p); }}>{p}</span>
                        })}
      </div>
=======
>>>>>>> parent of 813c485... checkpoint2
=======
>>>>>>> parent of 813c485... checkpoint2
      {
        props.users.map( u =>
          <div className={style.users} key={u.id}>
            <span>
              <div>
<<<<<<< HEAD
<<<<<<< HEAD
                <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="avatar" />
                </NavLink>
=======
                <img src={u.photoUrl} alt="avatar" width="50px" />
>>>>>>> parent of 813c485... checkpoint2
=======
                <img src={u.photoUrl} alt="avatar" width="50px" />
>>>>>>> parent of 813c485... checkpoint2
              </div>
              <div>
                {u.followed ? <button onClick={ () => {props.unfollow(u.id)}}>Unfollow</button> : <button onClick={ () => {props.follow(u.id)}}>Follow</button>} 
              </div>
            </span>
            <span>
              <span>
                <div>{u.fullName}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{u.location.country}</div>
                <div>{u.location.city}</div>
              </span>
            </span>
          </div>)
      }
    </div>
  )
};

export default Users;