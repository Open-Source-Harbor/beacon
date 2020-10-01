import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../components/HomePage.jsx'
import MainPage from '../components/MainPage.jsx'
import MainPageGreeting from '../components/MainPageGreeting.jsx';


function Main(props) {
  return (
    <div className="mainContainer">
      <Switch>
        <Route path="/main">
            <MainPageGreeting />
            <MainPage newJobAdded={props.newJobAdded}/>
        </Route>
        <Route exact path="/">
            <HomePage />
        </Route>            
      </Switch>
    </div>
  );
}

export default Main;