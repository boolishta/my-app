import React, { Component } from 'react';
import { Route, withRouter, BrowserRouter } from 'react-router-dom';
import './App.css';
import Friends from './components/Friends/Friends';
import Musics from './components/Musics/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

const DialogsConstainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); //компонента будет загружаться по мере необходимости
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {//классовая компонента, можем послать запрос на сервер

  componentDidMount() {
    this.props.initializeApp(); //thunki
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      /* если url совпадает то Route рендерит страницу в path можно добавить параметры */
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={ withSuspense(DialogsConstainer) } />
          <Route path='/profile/:userId?' render={ withSuspense(ProfileContainer) } />
          <Route path='/musics' render={() => <Musics />} />
          <Route path='/news' render={() => <News />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/friends' render={() => <Friends />} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/login' render={() => <Login />} />
        </div>
      </div>

    );
  }
}

const mapStateTiProps = (state) => ({
  initialized: state.app.initialized
})

/* оборачиваем в withRouter и connect */
const AppContainer = compose(
  withRouter,
  connect(mapStateTiProps, { initializeApp }))(App);

const MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;