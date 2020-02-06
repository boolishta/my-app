import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer'
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component{

  componentDidMount() {
    console.log('вызвалась функция');
    
    let userId = this.props.match.params.userId //дополнительный параметр переданный в Route, в него записываем параметр из пропсов
    if(!userId) {
      userId = 2;
    }
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId) //посылаем запрос на сервер
        .then(Response => { //в response.data приходит объект с сервера
          this.props.setUserProfile(Response.data); //отправляем из компоненты в state с помощью setUsersProfile которая приходит через пропсы из mapDisatchToProps
        })
  }

  render() {
    debugger
    return (
      <Profile {...this.props} profile={this.props.profile} /> //передаем все пропсы дальше которые пришли
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
}) //когда возвращаем объект то его нужно обернуть скобками, если не сделать то будет восприниматься как тело функции

let WithUrlDataContainerComponent = withRouter(ProfileContainer); //оборачиваем ProfileContainer, withRouter возвращает новую компоненту,
                                                                    //получает данные из URL и передает

export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);