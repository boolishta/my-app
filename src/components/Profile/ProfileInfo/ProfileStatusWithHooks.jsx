import React, { useState, useEffect } from 'react';
import style from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

  /* функция useState (hook) возвращает массив из двух элементов:
   1 - это значение которое передали: false
   2 - функция которая меняет значение false */
   let [editMode, setEditMode] = useState(false); //локальный state, если true то отображается input, если false то span
   let [status, setStatus] = useState(props.status);

   useEffect( () => {
    setStatus(props.status);
   }, [props.status]); //функция выполнится после отрисовки компоненты, вторым значением вводим зависимость от статуса, если изменился то запускаем useEffect

  const activateEditMode = () => { //при двойном клике меняем editMode на true
    setEditMode(true);
  }
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status) //добавиляем измененный статус в state
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div className={style.profileStatus}>
      { !editMode &&
        <div>
          <span onDoubleClick={ activateEditMode }>{props.status || "Change your status"} </span>
        </div>
      }
      { editMode &&
        <div>
           <input autoFocus={ true } onBlur={ deactivateEditMode } onChange={ onStatusChange } value= { status }/>
        </div>
      }
    </div>
  );
}

export default ProfileStatusWithHooks;