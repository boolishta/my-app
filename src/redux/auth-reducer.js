import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';

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
        ...action.payload
      }
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => {
  return { type: SET_USER_DATA, payload: {userId, email, login, isAuth} }
}

//thunk
export const getAuthUserData = () => async (dispatch) => { // асинхронная функция, результатом вернется промис
  const Response = await authAPI.getMe();
  if (Response.data.resultCode === 0) { //если мы авторизованы то записываем данные id login email
    let { id, login, email } = Response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const login = (email, password, rememberMe) => async (dispatch) => { //async функция
  const Response = await authAPI.login(email, password, rememberMe);
  if(Response.data.resultCode === 0) { //если с данными все в порядке то дистпатчим
    dispatch(getAuthUserData());
  } else {  // если нет то диспатчим stopSubmit
    //прекратить сабмит формы, если в форме что-то заполнено не верно то выводим ошибку
    let message = Response.data.messages.length > 0 ? Response.data.messages[0] : "Some Error";
    dispatch(stopSubmit("login", {_error: message}));
  }
};

export const logout = () => async (dispatch) => {
  const Response = await authAPI.logout()
    if(Response.data.resultCode === 0) { //если с данными все в порядке то зануляем все данные
      dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;