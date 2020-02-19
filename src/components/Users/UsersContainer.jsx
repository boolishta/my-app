import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { follow, requestUsers, setCurrentPage, toggleFollowProgress, unfollow } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';


/* UsersAPIComponent - делает аякс запросы на сервер и отрисовывает презентационную компоненту */

class UsersContainer extends React.Component {
  //запросы на сервер
  componentDidMount() { //данный метод вызывается сразу как компонента отрисуется (вставка в DOM)
    const { currentPage, pagesSize } = this.props; //деструктуризация
    this.props.getUsers(currentPage, pagesSize);
  }

  onPageChanged = (pageNumber) => {
    const { pagesSize } = this.props;
    this.props.getUsers(pageNumber, pagesSize);
  }

  render() {
    //передаем пропсы в Users только те которые нужны этой компоненте
    //пропсы получаем через connect
    return <>
      {this.props.isFetching ?
        <Preloader /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
        pagesSize={this.props.pagesSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress} />
    </>
  }
};

/*
let mapStateToProps = (state) => { //пропы для Users.jsx, берем только те state которые нужны компоненте,
                                  //чтобы при изменениях она не перерисовывалась
  return {
    users: state.usersPage.users,
    pagesSize: state.usersPage.pagesSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
};
*/

let mapStateToProps = (state) => { //пропы для Users.jsx, берем только те state которые нужны компоненте,
  //чтобы при изменениях она не перерисовывалась
  return {
    users: getUsers(state),
    pagesSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
};

/* let mapDispatchToProps = (dispatch) => { // пропсы, все колбэки которые диспатчат в state/store, объект создаем с помощью action creator
return {
  follow: (userId) => { dispatch(followAC(userId)); },
  unfollow: (userId) => { dispatch(unfollowAC(userId)); },
  setUsers: (users) => { dispatch(setUsersAC(users));} ,//диспатчим вызов AC: объект
  setCurrentPage: (pageNumber) => { dispatch(setCurrentPageAC(pageNumber)); },
  setTotalUsersCount: (totalCount) => { dispatch(setTotalUsersCountAC(totalCount)) },
  toggleIsFetching: (isFetching) => { dispatch(toggleIsFetchingAC(isFetching)); }
}}; */


/* с помощью compose добавляем процессы, обработчики к UsersContainer */
export default compose(
  //withAuthRedirect, если не залогинин то переход на страницу регистрации login
  connect(mapStateToProps,
    { follow, unfollow, setCurrentPage, toggleFollowProgress, getUsers: requestUsers })
)(UsersContainer)