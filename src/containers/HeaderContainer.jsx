import React from 'react';


function Header() {
  return (
    <div className="header">
      <p>This will be the header<span><a className="logoutButton" href="http://localhost:8080/api/logout"><button>Logout</button></a></span></p>
    </div>
  );
}

export default Header;