import React from 'react';
import Header from './HeaderContainer.jsx'
import Main from './MainContainer.jsx'
import Footer from './FooterContainer.jsx'


import '../App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
