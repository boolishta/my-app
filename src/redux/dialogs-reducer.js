const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
  messages: [
    {id: 1, message: 'Hiiiii'},
    {id: 2, message: 'loreeeem'},
    {id: 3, message: 'Bay'}
  ],
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
      let text = action.newMessageBody;
      return { //сразу возвращаем копию state
        ...state, //копия state
        messages: [ ...state.messages, { id: 6, message: text }]  //создаем новый массив, в него перадаем state.messages, вторым значением добавляем в конец массива новое сообщение (пушим)
      };                                                          //что бы добавить в начало массива то ставим первым значением

    default:
       return state;
  }
};

export const addMessageActionCreator = (newMessageBody) => {
  return {type: ADD_MESSAGE, newMessageBody }
}

export default dialogsReducer;