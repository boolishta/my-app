import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null
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
    case GET_CAPTCHA_URL_SUCCESS:
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

export const getCaptchaUrlSuccess = (captchaUrl) => {
  return { type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} }
}

//thunk
export const getAuthUserData = () => async (dispatch) => { // асинхронная функция, результатом вернется промис
  const Response = await authAPI.getMe();
  if (Response.data.resultCode === 0) { //если мы авторизованы то записываем данные id login email
    let { id, login, email } = Response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => { //async функция
  const Response = await authAPI.login(email, password, rememberMe, captcha);
  if(Response.data.resultCode === 0) { //если с данными все в порядке то дистпатчим
    dispatch(getAuthUserData());
  } else { // если нет то диспатчим stopSubmit
      if (Response.data.resultCode === 10){ // если сервер выдал ошибку 10 диспатчим санку
        dispatch(getCaptchaUrl());
      }
    //прекратить сабмит формы, если в форме что-то заполнено не верно то выводим ошибку
    let message = Response.data.messages.length > 0 ? Response.data.messages[0] : "Some Error";
    dispatch(stopSubmit("login", {_error: message}));
  }
};

export const getCaptchaUrl = () => async (dispatch) => { // функция thunkCreator создаюшая санку
  const Response = await securityAPI.getCaptchaUrl();
  const captchaUrl = Response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl)); //результат функции диспатчим в state
}

export const logout = () => async (dispatch) => {
  const Response = await authAPI.logout()
    if(Response.data.resultCode === 0) { //если с данными все в порядке то зануляем все данные
      dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;