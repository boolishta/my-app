import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import Profile from './Profile';

//создаем контейнерную компоненту, которая будет слать запросы на сервер
//передаем все пропсы дальше в другую компоненту
//проверить что придет в пропсах если убрать спред оператор ...
class ProfileContainer extends React.Component {

  refreshProfile() {
    /* в App.js в Route в path добавили параметр userId который отображается в props.match.params.userId */
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = this.props.autorizedUserId; //мой id из state
      if(!userId) {//если нет UserId то переходим на страницу login
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId); //реализовали через thunk из пропсов в profile-reduser
    this.props.getStatus(userId);
  }

  componentDidMount() { //срабатывает один раз когда компонента монитруется
    this.refreshProfile();
  }

  componentDidUpdate(prevProps) { //срабатывает каждый раз когда меняются пропсы
    if(this.props.match.params.userId !== prevProps.match.params.userId) { //если текущие пропсы не равны прошлым пропсам то обновить компоненту
      this.refreshProfile();
    }
  }
  render() {
    
    return (
      <Profile {...this.props}
              isOwner={!this.props.match.params.userId}
              profile={this.props.profile}
              status={this.props.status}
              updateStatus={this.props.updateStatus}
              savePhoto={this.props.savePhoto}/>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

  /* ProfileContainer прокидываем в  withAuthRedirect и затем дальше вверх*/
export default compose(
  connect (mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
) (ProfileContainer);