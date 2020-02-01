const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
  users: [
    {id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3OSh603dltQapzjU7bhajpK3nj6FaiawNO9o6xoHyPsmCU4LZ', followed: true, fullname: 'Ivanov Ivan', status:'fdfdfd', location: {city: 'Minsk', country: 'Belarus'}},
    {id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3OSh603dltQapzjU7bhajpK3nj6FaiawNO9o6xoHyPsmCU4LZ', followed: false, fullname: 'Ivanov Ivan', status:'ssssss', location: {city: 'London', country: 'UK'}},
    {id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3OSh603dltQapzjU7bhajpK3nj6FaiawNO9o6xoHyPsmCU4LZ', followed: false, fullname: 'Ivanov Ivan', status:'aaaaa', location: {city: 'Tokyo', country: 'Japan'}},
  ]
};

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
      return { ...state, users: [ ...state.users, ...action.users ] }
    }
    default:
      return state;
  }
};

export const followAC = (userId) => ({type: FOLLOW, userId }); //action creator
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (userId) => ({ type: SET_USERS, userId });

export default usersReducer;