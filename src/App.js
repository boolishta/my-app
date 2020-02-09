import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DialogsConstainer from './components/Dialogs/DialogsContainer';
import Friends from './components/Friends/Friends';
import Musics from './components/Musics/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App = (props) => {

  return (
  /* если url совпадает то Route рендерит страницу
    в path можно добавить параметры */
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs'            render={ () => <DialogsConstainer store={props.store} /> } />
          <Route path='/profile/:userId?'   render={ () => <ProfileContainer /> } />
          <Route path='/musics'             render={ () => <Musics /> } />
          <Route path='/news'               render={ () => <News /> } />
          <Route path='/settings'           render={ () => <Settings /> } />
          <Route path='/friends'            render={ () => <Friends /> } />
          <Route path='/users'              render={ () => <UsersContainer /> } />
          <Route path='/login'              render={ () => <Login /> } />
        </div>
      </div>

  );
}

export default App;
