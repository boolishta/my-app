export const getUsers = (state) => { //принимает state и возвращает нунжные данные
  return state.usersPage.users
}

export const getPageSize = (state) => {
  return state.usersPage.pagesSize
}

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}
export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress
}