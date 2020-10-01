import React, { Component, useState, useEffect, memo } from 'react';

class MainPageGreeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photo: "",
      email: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/user")
      .then((res) => {
        console.log("MainPage.jsx fetch /user raw res: ", res);
        return res.json();
      })
      .then((user) => {
        console.log("MainPage.jsx fetch /user user: ", user);
        this.setState({
          name: `${user.firstName} ${user.lastName}`,
          photo: `${user.photo}`,
          email: `${user.email}`,
        });
        // setName(`${data.firstName} ${data.lastName}`);
      })
      .catch((err) => console.log(`error when fetching user data: ${err}`));
  }

  render () {
    return (
      <div className="mainPageGreeting">
        <span>Insert Photo Here: {this.state.photo}</span>
        <br />
        <span>Welcome, {this.state.name}!</span>
        <br />
        <span>Email: {this.state.email}</span>
      </div>
    );
  }
}

export default MainPageGreeting;