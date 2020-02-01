import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store ={
  _state: {
    profilePage: {
      posts: [
        {id: 1, message: 'Hi, lol', likesCount:'80'},
        {id: 2, message: 'Hi, kok', likesCount:'140'}
      ],
      newPostText: ''
    },
    dialogsPage: {
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
    },
    friends: {
      friend1: [
        {id: 1, name: "Ivan", surname: "Ivanov", age: 18}
      ]
    },
    sidebar: {}
  },
  _callSubsriber() { console.log('something'); },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubsriber = observer;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubsriber(this._state);
  }
};

window.state = store;

export default store;