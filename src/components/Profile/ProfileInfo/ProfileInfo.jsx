import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../Command/Preloader/Preloader';
import photoNull from '../../../assets/images/photo.png';

const ProfileInfo = (props) => {
  /* станица рендерится сразу не дожидаясь данных, поэтому если в profile ничего нет (в profile-reducer в profile записан null)
    то загружаем Preloader, когда данные засетаются компонента обновится и вернется разметка jsx ниже */
  if(!props.profile) {
    return <Preloader />
  }
  let photoLarge = props.profile.photos.large;

  return (
    <div className={style.profileInfo}>
      <img className={style.wall} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8s2dl5j784guvwzq_l1yW19jvlsTCXBPPY-hfRZcsp9q_YEd5w&s" alt="avatar"/>
      <div>
        <img className={style.avatar} src={ photoLarge ? photoLarge : photoNull }  alt=""/>
        <p><strong>Full Name:</strong> {props.profile.fullName}</p>
        <p><strong>Contacts:</strong> {props.profile.contacts.vk}</p>
        <p><strong>About Me:</strong> {props.profile.aboutMe}</p>

      </div>
    </div>
    );
  }

export default ProfileInfo;