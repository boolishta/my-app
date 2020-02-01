const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
  messages: [
    {id: 1, message: 'Hiiiii'},
    {id: 2, message: 'loreeeem'},
    {id: 3, message: 'Bay'}
  ],
  newMessageText: '',
  dialogs: [
    {id: 1, name: 'User1'},
    {id: 2, name: 'User2'},
    {id: 3, name: 'User3'},
    {id: 4, name: 'User4'},
    {id: 5, name: 'User5'},
    {id: 6, name: 'User6'},
    {id: 7, name: 'User7'},
    {id: 8, name: 'User8'},
  ]
};

/* функция не должна менять входящиe данные (state) поэтому нужно сделать копию объекта state.
  Редюсеры определяют, как состояние приложения изменяется в ответ на экшены, отправленные в стор.
*/
const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_MESSAGE:
      let text = state.newMessageText;
      return { //сразу возвращаем копию state
        ...state, //копия state
        newMessageText: '', //перезатираем что бы очистить textarea
        messages: [ ...state.messages, { id: 6, message: text }]  //создаем новый массив, в него перадаем state.messages, вторым значением добавляем в конец массива новое сообщение (пушим)
      };                                                          //что бы добавить в начало массива то ставим первым значением

    case UPDATE_NEW_MESSAGE_TEXT:
      return { //сразу возвращаем копию state
        ...state, // создаем копию state
        newMessageText: action.newText // присваиваем новое значение newMessageText
      };

    default:
       return state;
  }
};

export const addMessageActionCreator = () => ( {type: ADD_MESSAGE} );
export const addUpdateNewMessageTextActionCreator = (text) => ( {type: UPDATE_NEW_MESSAGE_TEXT, newText: text} );

export default dialogsReducer;