import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../components/HomePage.jsx'
import MainPage from '../components/MainPage.jsx'
import MainPageGreeting from '../components/MainPageGreeting.jsx';


function Main(props) {
  const [userID, setUserID] = React.useState('5f75e7b2d3a398548e7addf1');

  return (
    <div className="mainContainer">
      <Switch>
        <Route path="/main">
            <MainPageGreeting setUserID={setUserID} />
            <MainPage userId={userID} newJobAdded={props.newJobAdded}/>
        </Route>
        <Route exact path="/">
            <HomePage />
        </Route>            
      </Switch>
    </div>
  );
}

export default Main;