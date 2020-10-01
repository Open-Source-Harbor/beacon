import React, { Component, useState, useEffect, memo } from 'react';

const MainPageGreeting = (props) => {
  
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch("http://localhost:8080/api/user")
      .then((res) => {
        console.log("MainPage.jsx fetch /user raw res: ", res);
        return res.json();
      })
      .then((user) => {
        console.log("MainPage.jsx fetch /user user: ", user);
        // console.log('user id on fetch in greeting', user._id)
          setUserID(user._id);
          setName(user.firstName);
          setPhoto(user.photo);
          setEmail(user.email);
        })
      .catch((err) => console.log(`error when fetching user data: ${err}`));
  });

  
    return (
      <div className="mainPageGreeting">
        <img id="profilePhoto" src={photo}></img>
        <br />
        <span id="welcomeMessage">Welcome, {name}!</span>
        <br />
      </div>
    );
  
}

export default MainPageGreeting;