import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
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
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
})

  /* ProfileContainer прокидываем в  withAuthRedirect и затем дальше вверх*/
export default compose(
  connect (mapStateToProps, { getUserProfile }),
  withRouter,
) (ProfileContainer);