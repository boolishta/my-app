import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
<<<<<<< HEAD
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching } from '../../redux/users-reducer';
import Preloader from '../Command/Preloader/Preloader';


/* UsersAPIComponent - делает аякс запросы на сервер и отрисовывает презентационную компоненту */

class UsersContainer extends React.Component {
  //запросы на сервер
  componentDidMount() { //данный метод вызывается сразу как компонента отрисуется (вставка в DOM)

    this.props.toggleIsFetching(true); //когда посылаем запрос показываем индикатор загрузки
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pagesSize}`) //посылаем запрос на сервер
      .then(Response => {
        this.props.toggleIsFetching(false); //когда получаем ответ убираем индикатор загрузки
        this.props.setUsers(Response.data.items); //отправляем из компоненты в state с помощью setUsers которая приходит через пропсы из mapDisatchToProps
        this.props.setTotalUsersCount(Response.data.totalCount); //отправляем из компоненты в state
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pagesSize}`) //посылаем запрос на сервер
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
                    unfollow={this.props.unfollow}/>
    </>
  }
};

let mapStateToProps = (state) => { //пропсы для Users.jsx только те которые нужны
=======
import { followAC, unfollowAC, setUsersAC } from '../../redux/users-reducer';
import Users from './Users';

let mapStateToProps = (state) => {
>>>>>>> parent of 813c485... checkpoint2
=======
import { followAC, unfollowAC, setUsersAC } from '../../redux/users-reducer';
import Users from './Users';

let mapStateToProps = (state) => {
>>>>>>> parent of 813c485... checkpoint2
  return {
    users: state.usersPage.users
  }
};

<<<<<<< HEAD
<<<<<<< HEAD
// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber)); //диспатчим вызов AC: объект
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount))
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching));
//     }
//   }
// };

/* все колбэки которые диспатчат в state/store, объект создаем с помощью action creator и пропсами передаем в компоненту
   mapDispatchToProps переписали и записали в коннект как объект */

export default connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching }) (UsersContainer);
=======
=======
>>>>>>> parent of 813c485... checkpoint2
let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    }
  }
};

<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps) (Users);
>>>>>>> parent of 813c485... checkpoint2
=======
export default connect(mapStateToProps, mapDispatchToProps) (Users);
>>>>>>> parent of 813c485... checkpoint2
