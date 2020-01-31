import React from 'react';
import style from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div className={style.profileInfo}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8s2dl5j784guvwzq_l1yW19jvlsTCXBPPY-hfRZcsp9q_YEd5w&s" alt="avatar"/>
      <div>ava + description</div>
    </div>
    );
  }

export default ProfileInfo;