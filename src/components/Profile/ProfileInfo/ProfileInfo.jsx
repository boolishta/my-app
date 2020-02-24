import React, { useState } from 'react';
import photoNull from '../../../assets/images/photo.png';
import wall from '../../../assets/images/wall.jpeg';
import Preloader from '../../common/Preloader/Preloader';
import style from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ savePhoto, profile, status, updateStatus, isOwner, saveProfile }) => {
  /* станица рендерится сразу не дожидаясь данных, поэтому если в profile ничего нет (в profile-reducer в profile записан null)
    то загружаем Preloader, когда данные засетаются компонента обновится и вернется разметка jsx ниже */

  /* добавляем state с помощью хуков */
  let [editMode, setEditMode] = useState(false);

  if (!profile) { return <Preloader /> }
  let photoLarge = profile.photos.large;

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => { //получаем дата с формы (fullname, aboutMe, ..)
    //console.log(formData);
    const promise = saveProfile(formData);
    promise.then( //когда санка закончится успешно сетаем
      () => {
        setEditMode(false);
      }
    )
  }

  return (
    <div className={style.profileInfo}>
      <img className={style.wall} src={wall} alt="" />
      <div className={style.profile}>
        <div className={style.profileAvatar}>
          <img className={style.avatar} src={photoLarge ? photoLarge : photoNull} alt="" />
          { isOwner && <div>
            <input className={style.selectPhoto} type={"file"} onChange={onMainPhotoSelected} />
          </div>}
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
          { editMode
            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
            :  <ProfileData goToEditMode={ () => {setEditMode(true)} } profile={profile} isOwner={isOwner}/> }
      </div>
    </div>
  );
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div className={style.profileDescription}>
      { isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
      <p><strong>Full Name:</strong> {profile.fullName}</p>
      <p><strong>About Me:</strong> {profile.aboutMe}</p>
      <p><strong>Looking for a job:</strong> {profile.lookingForAJob ? "yes" : "no"} </p>
      {profile.lookingForAJob &&
        <p><strong>My professional skills: </strong>{profile.lookingForAJobDescription}</p>}
        <div><b>Contacts</b>: { Object.keys(profile.contacts).map(key => {
                              return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key] } />
        })}</div>
    </div>
  )
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={style.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;