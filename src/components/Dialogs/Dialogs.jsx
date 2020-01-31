import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import { addMessageActionCreator, addUpdateNewMessageTextActionCreator } from '../../redux/state';

const Dialogs = (props) => {

  let dialogsElements = props.dialogsPage.dialogs.map( e => <DialogItem name={ e.name } id={ e.id }/>);
  let messagesElements = props.dialogsPage.messages.map( e => <Message message={ e.message }/>);

  let newMessageElement = React.createRef();

  const addMessage = () => {
    props.dispatch(addMessageActionCreator());
  };

  const onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.dispatch(addUpdateNewMessageTextActionCreator(text));
  }

  return (
    <div className = { style.dialogs }>
      <div className = { style.dialogsItem }> { dialogsElements } </div>
      <div className = { style.messages }> { messagesElements }
        <div className={style.sendMessage}>
          <textarea ref={newMessageElement }
                    onChange={onMessageChange}
                    value={props.dialogsPage.newMessageText}
                     cols="50" rows="6"></textarea>
          <button onClick={addMessage}>Send message</button></div>
      </div>
    </div>
  );
}

export default Dialogs;