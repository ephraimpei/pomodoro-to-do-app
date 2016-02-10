// main sass file
import "../static/sass/main.scss";

// core modules
import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// components
import PomodoroToDoApp from './components/main/pomodoro_to_do_app.jsx';
import Footer from './components/main/footer.jsx';

$(document).ready(function () {
  const routes = (
    <Route path="/" components={ PomodoroToDoApp } />
  );

  render(<Router history={ browserHistory } routes={routes} />,
    document.getElementById('content'));
  render(<Footer/>, document.getElementById('footer-wrapper'));
});
