import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route } from 'react-router-dom';
import Musics from './components/Musics/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends';

const App = (props) => {

  return (

      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={ () => <Dialogs dialogsPage={props.state.dialogsPage}
                                                         dispatch={props.dispatch}/>} />
          <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}
                                                        dispatch={props.dispatch}/>} />
          <Route path='/musics' render={() => <Musics />} />
          <Route path='/news' render={() => <News />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/friends' render={() => <Friends state={props.state.friends}/>} />
        </div>
      </div>

  );
}

export default App;
