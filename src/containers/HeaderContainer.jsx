import React from 'react';

function Header(props) {
  return (
    <div className="header">
      <button onClick={() => props.openModal(true)}>Create Job</button>
      <a className="logoutButton" href="http://localhost:8080/api/logout">
        <button>Logout</button>
      </a>
    </div>
  );
}

export default Header;