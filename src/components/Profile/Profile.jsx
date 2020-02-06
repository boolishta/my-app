import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
  debugger
  return (
    <div className={style.profile}>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer store={props.store} />
    </div>
    )
  }

export default Profile;