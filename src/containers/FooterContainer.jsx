import React, { Component } from "react";
import Popup from "../components/Popup"; 


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seen: false,
    };
  this.togglePop = this.togglePop.bind(this);
  };

  togglePop () {
   this.setState({
    seen: !this.state.seen
   });
  };

  render () {
    return (
      <div className="footer">
        <nav className="footerText">Privacy Policy</nav>
        {/* <div className="chatroomContainer">
          <div className="chatButton" onClick={this.togglePop}>
            <button className="chatPopup">Chatroom</button>
          </div>
          {this.state.seen ? <Popup toggle={this.togglePop} /> : null}
        </div> */}
      </div>
    );
  }
}

export default Footer;