import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DialogsConstainer from './components/Dialogs/DialogsContainer';
import Friends from './components/Friends/Friends';
import Header from './components/Header/Header';
import Musics from './components/Musics/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';

const App = (props) => {

  const dialogs = () => <DialogsConstainer store={props.store}/>;
  const musics = () => <Musics />;
  const news = () => <News />;
  const settings = () => <Settings />;
  const friends = () => <Friends store={props.store}/>; //сделать reducer

  return (
  /* если url совпадает то Route рендерит страницу */
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={ dialogs } />
          <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
          <Route path='/musics' render={ musics } />
          <Route path='/news' render={ news } />
          <Route path='/settings' render={ settings } />
          <Route path='/friends' render={ friends } />
          <Route path='/users' render={ () => <UsersContainer /> } />
        </div>
      </div>

  );
}

export default App;
