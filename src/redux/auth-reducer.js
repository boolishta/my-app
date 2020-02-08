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

export default authReducer;