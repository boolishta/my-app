const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';



let store ={
  _state: {
    profilePage: {
      posts: [ {id: 1, message: 'Hi, lol', likesCount:'80'}, {id: 2, message: 'Hi, kok', likesCount:'140'} ],
      newPostText: ''
    },
    dialogsPage: {
      messages: [ {id: 1, message: 'Hiiiii'}, {id: 2, message: 'loreeeem'}, {id: 3, message: 'Bay'} ],
      newMessageText: '',
      dialogs: [ {id: 1, name: 'User1'}, {id: 2, name: 'User2'}, {id: 3, name: 'User3'}, {id: 4, name: 'User4'}, {id: 5, name: 'User5'}, {id: 6, name: 'User6'}, {id: 7, name: 'User7'}, {id: 8, name: 'User8'}, ] },
    friends: {
      friend1: [ {id: 1, name: "Ivan", surname: "Ivanov", age: 18} ]
    }
  },
  _callSubsriber() { console.log('something'); },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubsriber = observer;
  },

  dispatch(action) {
    if(action.type === 'ADD-POST') {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubsriber(this._state);
    } else if(action.type === 'UPDATE-NEW-POST-TEXT') {
      this._state.profilePage.newPostText = action.newText;
      this._callSubsriber(this._state);
    } else if(action.type === 'ADD-MESSAGE') {
      let newMessage = {
        id: 5,
        message: this._state.dialogsPage.newMessageText
      };
      this._state.dialogsPage.messages.push(newMessage);
      this._state.dialogsPage.newMessageText = '';
      this._callSubsriber(this._state);
    } else if(action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
      this._state.dialogsPage.newMessageText = action.newText;
    this._callSubsriber(this._state);
    }
  }
}

export const addPostActionCreator = () => {
  return {
    type: ADD_POST
  }
}
export const addUpdateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT, newText: text
  }
}
export const addMessageActionCreator = () => {
  return {type: ADD_MESSAGE}
};

export const addUpdateNewMessageTextActionCreator = (text) => {
  return {type: UPDATE_NEW_MESSAGE_TEXT, newText: text}
}

window.state = store;

export default store;