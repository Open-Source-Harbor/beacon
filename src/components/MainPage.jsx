import React, { Component, useState, useEffect, memo } from 'react';
import Modal from './Modal';
import JobFeed from './JobFeed';
import JobBoard from './JobBoard';
import Chatroom from "./Chatroom";
// import ArchiveBoard from './ArchiveBoard';


class MainPage extends Component {
	constructor(props) {
        super(props);
    //     this.state = {
    //         modal: false;
    //     }
    }
    // if (this.state.modal) {

    // }


    render () {
        return (
    <div className="mainPage">
        <div className="mainBoard">
            <JobFeed />
            <JobBoard newJobAdded={this.props.newJobAdded}/>
        </div>
        {/* <div className="showArchive">
            <ArchiveBoard />
        </div>         */}
            <div className="showModal">
              <Modal />
            </div>
          </div>
        ); 
      }
}


export default MainPage;