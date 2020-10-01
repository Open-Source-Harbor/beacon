import React from 'react';

function Header(props) {
  return (
    <div className="header">
      <div id="logo"></div>
      <button className="headerButton" onClick={() => props.openModal(true)}>Create Job</button>
      <a className="logout" href="http://localhost:8080/api/logout">
        <button className="headerButton">Logout</button>
      </a>
    </div>
  );
}

export default Header;