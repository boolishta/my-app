import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DialogsConstainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Musics from './components/Musics/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';

const App = (props) => {

  const dialogs = () => <DialogsConstainer store={props.store}/>;
  const profile = () => <Profile store={props.store}/>;
  const musics = () => <Musics />;
  const news = () => <News />;
  const settings = () => <Settings />;

  return (
  /* если url совпадает то Route рендерит страницу */
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={ dialogs } />
          <Route path='/profile' render={ profile }/>
          <Route path='/musics' render={ musics } />
          <Route path='/news' render={ news } />
          <Route path='/settings' render={ settings } />
          <Route path='/users' render={ () => <UsersContainer /> } />
        </div>
      </div>

  );
}

export default App;
