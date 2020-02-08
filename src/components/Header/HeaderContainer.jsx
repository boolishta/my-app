import React from 'react';
import Header from './Header';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {

  componentDidMount() {
    Axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
      withCredentials: true
    }) //посылаем запрос на сервер, вторым параметром отправляем куки
      .then(Response => {
        if(Response.data.resultCode === 0) {
          let data = Response.data.data;
          this.props.setAuthUserData(data);
        }
      });
  }

  render () {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);

