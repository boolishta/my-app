import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DialogsConstainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Musics from './components/Musics/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';

const App = (props) => {
  return (
  /* если url совпадает то Route рендерит страницу */
  /* в path можно дописать параметры, название параметра можно любое  */
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs'
                 render={ () => <DialogsConstainer store={props.store}/> } />
          <Route path='/profile/:userId?'
                 render={ () => <ProfileContainer /> } />
          <Route path='/musics' render={ () => <Musics /> } />
          <Route path='/news' render={ () => <News /> } />
          <Route path='/settings' render={ () => <Settings /> } />
          <Route path='/friends' render={ () => <Friends store={props.store}/> } />
          <Route path='/users' render={ () => <UsersContainer /> } />
        </div>
      </div>

  );
}

export default App;
