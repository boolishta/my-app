import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCCESS = 'INITIALIZED_SUCCCESS';

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case INITIALIZED_SUCCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCCESS });
export const initializeApp = () => (dispatch) => {
  let promise =  dispatch(getAuthUserData()); //вернется промис диспатча
  //dispath(somethingelse());
  //dispath(somethingelse());
  //Promise.all([promise]).then(()=>{}) когда все промисы зарезолвится тогда then
  promise.then(() => { //когда асинхронная операция будет закончена диспатчим initializedSuccess
    dispatch(initializedSuccess());
  })
}

export default appReducer;