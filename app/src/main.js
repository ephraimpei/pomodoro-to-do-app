// main sass file
import "../static/sass/main.scss";

// vendor stylesheets
import "../static/vendor/rcslider.css";

// core modules
import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// components
import PomodoroToDoApp from './components/main/pomodoro_to_do_app.jsx';
import Footer from './components/main/footer.jsx';
import LoginPage from './components/auth/login_page.jsx';
import SignUpPage from './components/auth/sign_up_page.jsx';
import UserShowPage from './components/user/user_show_page.jsx';
import ToDoShowPage from './components/todo/todo_show_page.jsx';

$(document).ready(function () {
  const routes = (
    <Route path="/" component={ PomodoroToDoApp } >
      <IndexRoute component={ LoginPage } />
      <Route path="/user/new" component={ SignUpPage } />
      <Route path="/user/:username" component={ UserShowPage } />
      <Route path="/user/:username/todo/:id" component={ ToDoShowPage } />
    </Route>
  );

  render(<Router history={ browserHistory } routes={ routes } />,
    document.getElementById('content'));
  render(<Footer/>, document.getElementById('footer-wrapper'));
});
