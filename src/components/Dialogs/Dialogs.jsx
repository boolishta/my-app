import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validator';

const Dialogs = (props) => {

  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map( e => <DialogItem name={ e.name } key={e.id} id={ e.id }/>);
  let messagesElements = state.messages.map( e => <Message message={ e.message } key={e.id}/>);

  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);//диспатчим значение из формы
  };

  if(!props.isAuth) return <Redirect to={"/Login"} />; //если не золигинины то делается редирект на страницу login

  return (
    <div className = { style.dialogs }>
      <div className = { style.dialogsItem }> { dialogsElements } </div>
      <div className = { style.messages }> { messagesElements } </div>
      <AddMessageformRedux onSubmit={addNewMessage}/>
    </div>
  );
}

const maxLength50 = maxLengthCreator(50); //максимальная длина 50 символов

const AddMessageform = (props) => { //вынести отдельной компонентой
  return (
    <form className={style.sendMessage} onSubmit={props.handleSubmit}>
      <Field component={Textarea}
            validate={[required, maxLength50 ]}
            name="newMessageBody"
            placeholder="Enter your message" />

    <button >Send message</button></form>
  )
}

const AddMessageformRedux = reduxForm({form: "dialogsAddMessageForm"}) (AddMessageform);

export default Dialogs;