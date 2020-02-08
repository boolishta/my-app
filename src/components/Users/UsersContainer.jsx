import React from 'react';
import { connect } from 'react-redux';
import { usersAPI } from '../../api/api';
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow } from '../../redux/users-reducer';
import Preloader from '../Command/Preloader/Preloader';
import Users from './Users';


/* UsersAPIComponent - делает аякс запросы на сервер и отрисовывает презентационную компоненту
    Аякс запросы передали функции getUsers и вынесли в отдельный файл */

class UsersContainer extends React.Component {
  //запросы на сервер
  componentDidMount() { //данный метод вызывается сразу как компонента отрисуется (вставка в DOM)
    this.props.toggleIsFetching(true); //когда посылаем запрос показываем индикатор загрузки
    usersAPI.getUsers(this.props.currentPage, this.props.pagesSize).then(data => { //перенесли Axios в отдельную функцию, через параметры передаем из
                                                                              //пропсов currentPage и pagesSize, в Response передали только data
            this.props.toggleIsFetching(false); //когда получаем ответ убираем индикатор загрузки
            this.props.setUsers(data.items); //отправляем из компоненты в state с помощью setUsers которая приходит через пропсы из mapDisatchToProps
            this.props.setTotalUsersCount(data.totalCount); //отправляем из компоненты в state
          });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);

    usersAPI.getUsers(pageNumber, this.props.pagesSize).then(data => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
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
                    unfollow={this.props.unfollow}/>
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
    isFetching: state.usersPage.isFetching
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
export default connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching }) (UsersContainer);