import React from 'react';
import './App.css';
// const uuid = require('uuid')

function App() {
  // const baseURI = "https://www.linkedin.com/oauth/v2/authorization";
  // const clientID ="860exmlhesujye";
  // const redirectURI = "http://localhost:3000/login"; 
  // const state = uuid.v4();
  // const scope = "r_liteprofile%20r_emailaddress";

  const oauth = () => {
    fetch('/login')
  };

  return (
    <div className="App">
      <p>Hello World</p>
      {/* <a href={`${baseURI}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`}> */}
        <button onClick={oauth}>Click for OAuth</button>
        {/* </a> */}
    </div>
  );
}

export default App;
