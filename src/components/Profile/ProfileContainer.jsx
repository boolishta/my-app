import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { getUserProfile } from '../../redux/profile-reducer';
import Profile from './Profile';

//создаем контейнерную компоненту, которая будет слать запросы на сервер
//передаем все пропсы дальше в другую компоненту
//проверить что придет в пропсах если убрать спред оператор ...
class ProfileContainer extends React.Component {

  componentDidMount() {
    /* в App.js в Route в path добавили параметр userId который отображается в props.match.params.userId */
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = 5890; //id на сервере
    }
    this.props.getUserProfile(userId); //реализовали через thunk из пропсов в profile-reduser
  }
  render() {
    if(!this.props.isAuth) return <Redirect to="/login" /> //если не золигны то редирект на Login
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth
})

//withRouter закинет в компоненту ProfileComponent данные из URL
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

//оборачиваем WithUrlDataContainerComponent в коннект, которая закидывает и получает данные из store
export default connect (mapStateToProps, { getUserProfile }) (WithUrlDataContainerComponent);