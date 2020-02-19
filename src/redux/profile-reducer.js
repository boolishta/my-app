import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
  posts: [
    {id: 1, message: 'Hi, lol', likesCount:'80'},
    {id: 2, message: 'Hi, kok', likesCount:'140'}
  ],
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {

  switch(action.type) {
    case ADD_POST:{
      let newPost = { id: 5, message: action.newPostText, likesCount: 0 };

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
    case DELETE_POST: {
      return {
        ...state, posts: state.posts.filter(p => p.id !== action.postId) //возвращается копия state в которой мы posts возьмем старые посты и отфильтруем по id только те посты которые не равны action.postId
      }
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });


//thunk
export const getUserProfile = (userId) => async (dispatch) => {
    const Response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(Response.data)); //отправляем из компоненты в state с помощью setProfile которая приходит через пропсы из mapDisatchToProps
}

export const getStatus = (userId) => async (dispatch) => {
    const Response = await profileAPI.getStatus(userId); // в response резальтат которым зарезолвится промис
    dispatch(setStatus(Response.data));
}

export const updateStatus = (status) => async (dispatch) => {
  const Response = await profileAPI.updateStatus(status);
  if (Response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
}

export default profileReducer;