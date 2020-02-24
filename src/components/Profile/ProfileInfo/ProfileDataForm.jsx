import React from 'react'
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import { reduxForm } from 'redux-form';
import style from './ProfileInfo.module.css';
import styleError from '../../common/FormsControls/FormsControls.module.css'

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form className={style.profileDescription} onSubmit={handleSubmit}>
      <div><button>save</button></div>
      { error && <div className={styleError.formSummaryError}> {error} </div> }
      <div><strong>Full Name:</strong> { createField("Full name", "fullName", [], Input) }</div>
      <div><strong>About Me:</strong> { createField("About Me", "aboutMe", [], Textarea) }</div>
      <div><strong>Looking for a job:</strong> { createField( "", "lookingForAJob", [], Input, { type: "checkbox" } ) }</div>
      <div><strong>My professional skills: </strong> { createField("My professional skills", "lookingForAJobDescription", [], Textarea) } </div>
      <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                                  return <div key={key} className={style.contact}>
                                    <b>{key}: { createField(key, "contacts." + key, [], Input) }</b>
                                  </div> })}</div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)
export default ProfileDataFormReduxForm;

