import React from 'react';
import style from './Users.module.css';

let  Users  = (props) => {
  return (
    <div>
      {
        props.users.map( u =>
          <div className={style.users} key={u.id}>
            <span>
              <div>
                <img src={u.photoUrl} alt="avatar" width="50px" />
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