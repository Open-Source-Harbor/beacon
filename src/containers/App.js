import React from 'react';
import Header from './HeaderContainer.jsx'
import Main from './MainContainer.jsx'
import Footer from './FooterContainer.jsx'
import '../App.scss';
import CLIENT_ID from './Secret.js';

const baseURI = "https://www.linkedin.com/oauth/v2/authorization";
// const CLIENT_SECRET = "8pufmbYSk8WPXaog";
// const CLIENT_ID = "860exmlhesujye";
const redirectURI = "http://localhost:3000/callback";
// const redirectURI = "http://192.168.0.28:3000";
const state = '46S7DJD0a9b';
const scope = "r_liteprofile%20r_emailaddress";
const authorizationURI = `${baseURI}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`;


function App() {
  
  return (
    <div className="App">
      <Header />
      <p>Hello World</p>
      <a href="/login" >
        LinkedIn
      </a>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
