import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';

//создаем контейнерную компоненту, которая будет слать запросы на сервер
//передаем все пропсы дальше в другую компоненту
//проверить что придет в пропсах если убрать спред оператор ...
class ProfileContainer extends React.Component {

  componentDidMount() {
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`) //посылаем запрос на сервер
      .then(Response => { //в Response.data приходит объект
        this.props.setUserProfile(Response.data); //отправляем из компоненты в state с помощью setProfile которая приходит через пропсы из mapDisatchToProps
      });
  }
  render() {
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
})

export default connect (mapStateToProps, {setUserProfile}) (ProfileContainer);