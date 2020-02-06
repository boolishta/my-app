import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../Command/Preloader/Preloader';

const ProfileInfo = (props) => {
  debugger
  if(!props.profile) {
    return <Preloader />
  }

  let contacts = props.profile.contacts;

  return (
    <div className={style.profileInfo}>
      <img className={style.picture} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8s2dl5j784guvwzq_l1yW19jvlsTCXBPPY-hfRZcsp9q_YEd5w&s" alt="pic"/>

      <img className={style.avatar} src={props.profile.photos.large} alt='ava'/>
      <div className={style.description}>
        <div className={style.fullName}> <strong>Full Name:</strong> {props.profile.fullName} </div>
        <div className={style.aboutMe}><strong>About Me:</strong> {props.profile.aboutMe}</div>
        <div className={style.contacts}><strong>Contacts:</strong> {contacts.vk}</div>
      </div>
    </div>
    );
  }

export default ProfileInfo;