import React, { useState, useEffect } from 'react';
import { Route, Switch} from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import MatchesPage from './Pages/MatchesPage/MatchesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/tracker" component={MatchesPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
