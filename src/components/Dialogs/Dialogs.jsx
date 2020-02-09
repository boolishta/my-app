import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';

const Dialogs = (props) => {

let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map( e => <DialogItem name={ e.name } key={e.id} id={ e.id }/>);
  let messagesElements = state.messages.map( e => <Message message={ e.message } key={e.id}/>);

  const addMessage = () => { //onSendMessageClick
    props.sendMessage();
  };

  const onMessageChange = (e) => {

    let text = e.target.value;

    props.updateNewMessageText(text);
  }

  if(!props.isAuth) return <Redirect to={"/Login"} />; //если не золигинины то делается редирект на страницу login

  return (
    <div className = { style.dialogs }>
      <div className = { style.dialogsItem }> { dialogsElements } </div>
      <div className = { style.messages }> { messagesElements }
        <div className={style.sendMessage}>
          <textarea placeholder='Enter your message'
                    onChange={onMessageChange}
                    value={props.dialogsPage.newMessageText}
                     cols="50" rows="6"></textarea>
          <button onClick={addMessage}>Send message</button></div>
      </div>
    </div>
  );
}

export default Dialogs;