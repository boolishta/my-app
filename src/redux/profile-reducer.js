import { usersAPI, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state, profile: { ...state.profile, photos: action.photos }
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
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });


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

export const savePhoto = (file) => async (dispatch) => {
  const Response = await profileAPI.savePhoto(file);
  if (Response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(Response.data.data.photos));
  }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
  let userId = getState().auth.userId;
  const Response = await profileAPI.saveProfile(profile);
  if (Response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", {_error: Response.data.messages[0]})); //покажет общую ошибку
    return Promise.reject(Response.data.messages[0]);
    //dispatch(stopSubmit("edit-profile", { "contacts": {"facebook": Response.data.messages[0]} })); //покажет ошибку в строке facebook
  }
}

export default profileReducer;