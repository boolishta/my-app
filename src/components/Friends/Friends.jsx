import React from 'react';
import style from './Friends.module.css';

const Friends = (props) => {
  return (
    <div className={style.friends}>{props.state.friend1[0].name} {props.state.friend1[0].surname} {props.state.friend1[0].age}</div>
  );
}

export default Friends;