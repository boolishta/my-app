import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';

//создаем контейнерную компоненту, которая будет слать запросы на сервер
//передаем все пропсы дальше в другую компоненту
//проверить что придет в пропсах если убрать спред оператор ...
class ProfileContainer extends React.Component {

  componentDidMount() {
    /* в App.js в Route в path добавили параметр userId который отображается в props.match.params.userId */
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = 2;
    }
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId) //посылаем запрос на сервер
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

//withRouter закинет в компоненту ProfileComponent данные из URL
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

//оборачиваем WithUrlDataContainerComponent в коннект, которая закидывает и получает данные из store
export default connect (mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);