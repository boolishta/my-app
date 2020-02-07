const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  users: [ ],
  pagesSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false
};

/* что то меняется в state через редьюсер */
/* редьюсер принимает старый state и action и меняет state на основании action */
const usersReducer = (state = initialState, action) => {

  switch(action.type) {
    case FOLLOW:
      /* возвращаем копию state */
      return {
        ...state,
      /* делаем копию users и проходим по массиву мапом*/
        users: state.users.map( u => {
          if(u.id === action.userId) {
            return {...u, followed: true} //возвращаем копию юзера с змененным состоянием followed
          }
          return u;
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map( u => {
          if(u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        })
      }
    case SET_USERS: {
      return { ...state, users: action.users } //делаем копию state и перезатираем users
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage }
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count }
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching }
    }
    default:
      return state;
  }
};

export const follow = (userId) => ({type: FOLLOW, userId }); //action creator возвращает объект
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage }); //изменить текущую страницу
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }); //установить общее количество пользователей
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });


export default usersReducer;