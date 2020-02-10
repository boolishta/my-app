import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
  posts: [
    {id: 1, message: 'Hi, lol', likesCount:'80'},
    {id: 2, message: 'Hi, kok', likesCount:'140'}
  ],
  newPostText: '',
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {

  switch(action.type) {
    case ADD_POST:{
      let newPost = { id: 5, message: state.newPostText, likesCount: 0 };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''
      };
      /* было так
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(newPost);
      stateCopy.newPostText = '';
      */
    }
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText
      }
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const addUpdateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });


//thunk
export const getUserProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId).then(Response => { //в Response.data приходит объект
      dispatch(setUserProfile(Response.data)); //отправляем из компоненты в state с помощью setProfile которая приходит через пропсы из mapDisatchToProps
    });
  }
}

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then(Response => {
      dispatch(setStatus(Response.data));
    });
  }
}

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then(Response => {
      if(Response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
  }
}

export default profileReducer;