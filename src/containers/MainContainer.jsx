import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { useHistory } from 'react-router'

import HomePage from '../components/HomePage.jsx'
import MainPage from '../components/MainPage.jsx'
import MainPageGreeting from '../components/MainPageGreeting.jsx';

// const history = useHistory()

function Main(props) {
  return (
    <div className="mainContainer">
      <Switch>
        <Route exact path="/main">
            {/* {history.go(0)} */}
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