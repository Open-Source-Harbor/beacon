import React, { Component, useState, useEffect, memo } from 'react';
import Modal from './Modal';
import JobFeed from './JobFeed';
import JobBoard from './JobBoard';
import Chatroom from "./Chatroom";
// import ArchiveBoard from './ArchiveBoard';


function MainPage(props) {
	// constructor(props) {
    //     super(props);
    //     this.state = {
    //         modal: false;
    //     }
    // }
    // if (this.state.modal) {

    // }

    const [changer, setChanger] = React.useState(0);

    console.log('In main page ', props.userId)

    // render () {
        return (
    <div className="mainPage">
        <div className="mainBoard">
            <JobFeed changer={changer} setChanger={setChanger}/>
            <JobBoard changer={changer} setChanger={setChanger} userId={props.userId} newJobAdded={props.newJobAdded}/>
        </div>
        {/* <div className="showArchive">
            <ArchiveBoard />
        </div>         */}
            <div className="showModal">
              {/* <Modal /> */}
            </div>
          </div>
        ); 
    //   }
}


export default MainPage;
