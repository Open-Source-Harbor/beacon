import React, { Component } from 'react';
import Modal from './Modal';
import JobFeed from './JobFeed';
import JobBoard from './JobBoard';
import ArchiveBoard from './ArchiveBoard'


class MainPage extends Component {
	// constructor(props) {
	// 	super(props);
    // }
    render () {
        return (
    <div className="mainPage">
        <div className="mainBoard">
            <JobFeed />
            <JobBoard />
        </div>
        {/* <div className="showArchive">
            <ArchiveBoard />
        </div>         */}
        <div className="showModal">
            {/* <Modal /> */}
        </div>
        
    </div>
        ); 
    }  
}


export default MainPage;