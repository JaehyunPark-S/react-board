import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import NavBar from './components/views/NavBar/NavBar';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import MainPage from './components/views/MainPage/MainPage';
import boardWritePage from './components/views/BoardWritePage/BoardWrite';
import FindAccount from './components/views/FindAccountPage/FindAccount';
import AccountInfo from './components/views/AccountInfoPage/AccountInfo';
import BoardRead from './components/views/BoardReadPage/BoardRead';
import BoardUpdate from './components/views/BoardUpdatePage/BoardUpdate';
import Welcome from './components/views/WelcomePage/Welcome';
import Comments from './components/views/CommentPage/Comments';
import Poke from './components/views/poke/poke';
function App() {
  return (
    <Router>
    <div>
      <NavBar />
      <Switch>
      <Route exact path="/" component={Auth(Welcome, false)} />
        <Route exact path="/mainpage" component={Auth(MainPage, true/*, true 관리자만 들어가야하면 추가해야하는 옵션*/)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/find" component={Auth(FindAccount, false)} />
        <Route exact path="/boardwrite" component={Auth(boardWritePage, true)} />
        <Route exact path="/accountinfo" component={Auth(AccountInfo, false)} />
        <Route exact path="/boardread" component={Auth(BoardRead, true)} />
        <Route exact path="/boardupdate" component={Auth(BoardUpdate, true)} />
        <Route exact path="/comments" component={Auth(Comments, true)} />
        <Route exact path="/poke" component={Auth(Poke, false)} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;