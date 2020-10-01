import React, { Component, useState, useEffect, memo } from 'react';
import Modal from './Modal';
import JobFeed from './JobFeed';
import JobBoard from './JobBoard';
import Chatroom from "./Chatroom";
// import ArchiveBoard from './ArchiveBoard';


class MainPage extends Component  {
  
    render () {
        return (
          <div className="mainPage">
            <div className="mainBoard">
              <JobFeed />
              <JobBoard />
              <Chatroom />
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