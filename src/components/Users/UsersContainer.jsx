import React from 'react';
import Axios from 'axios';
import Users from './Users';
import { connect } from 'react-redux';
import { usersAPI } from '../../api/api';
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow, toggleFollowProgress } from '../../redux/users-reducer';
import Preloader from '../Command/Preloader/Preloader';


/* UsersAPIComponent - делает аякс запросы на сервер и отрисовывает презентационную компоненту */

class UsersContainer extends React.Component {
  //запросы на сервер
  componentDidMount() { //данный метод вызывается сразу как компонента отрисуется (вставка в DOM)
    this.props.toggleIsFetching(true); //когда посылаем запрос показываем индикатор загрузки
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pagesSize}`,
      {
        withCredentials: true
      }) //посылаем запрос на сервер
      .then(Response => {
        this.props.toggleIsFetching(false); //когда получаем ответ убираем индикатор загрузки
        this.props.setUsers(Response.data.items); //отправляем из компоненты в state с помощью setUsers которая приходит через пропсы из mapDisatchToProps
        this.props.setTotalUsersCount(Response.data.totalCount); //отправляем из компоненты в state
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pagesSize}`,
      {
        withCredentials: true
      }) //посылаем запрос на сервер
    .then(Response => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(Response.data.items);
    });
  }

  render() {
    //передаем пропсы в Users только те которые нужны этой компоненте
    //пропсы получаем через connect
    return <>
      { this.props.isFetching ?
      <Preloader /> : null }
      <Users totalUsersCount={this.props.totalUsersCount}
                    pagesSize={this.props.pagesSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    toggleFollowProgress={this.props.toggleFollowProgress}
                    followingInProgress={this.props.followingInProgress}/>
    </>
  }
};

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

/* let mapDispatchToProps = (dispatch) => { // пропсы, все колбэки которые диспатчат в state/store, объект создаем с помощью action creator
  return {
    follow: (userId) => { dispatch(followAC(userId)); },
    unfollow: (userId) => { dispatch(unfollowAC(userId)); },
    setUsers: (users) => { dispatch(setUsersAC(users));} ,//диспатчим вызов AC: объект
    setCurrentPage: (pageNumber) => { dispatch(setCurrentPageAC(pageNumber)); },
    setTotalUsersCount: (totalCount) => { dispatch(setTotalUsersCountAC(totalCount)) },
    toggleIsFetching: (isFetching) => { dispatch(toggleIsFetchingAC(isFetching)); }
  }}; */


//вместо функции mapDispatchToProps передаем объекты, функция connect сама создает mdtp
export default connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowProgress }) (UsersContainer);