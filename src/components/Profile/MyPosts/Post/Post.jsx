import React from 'react';
import style from './Post.module.css';
import userPhoto from '../../../../assets/images/photo.png';


const Post = (props) => {

  return (
    <div className={style.post}>
      <div className={style.message}>
        <img src={userPhoto} alt="" />
        <div>{props.message}</div>
        <button className={style.deletePost}>x</button>
      </div>
      <div>like: {props.likesCount}</div>
    </div>
    );
  }

export default Post;