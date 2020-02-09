import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false
};

/* что то меняется в state через редьюсер */
/* редьюсер принимает старый state и action и меняет state на основании action */
const authReducer = (state = initialState, action) => { //в action приходил undefined из-за неверного импорта
  switch(action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    default:
      return state;
  }
};

export const setAuthUserData = (data) => {
  return { type: SET_USER_DATA, data: data }
}

//thunk
export const getAuthUserData = () => (dispatch) => { //функция которая возвращает другую функцию
    authAPI.getMe().then(Response => { //axios отдельной функцией
      if(Response.data.resultCode === 0) {
        let data = Response.data.data;
        dispatch(setAuthUserData(data));
      }
    });
}

export default authReducer;