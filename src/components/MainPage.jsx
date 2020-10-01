import React, { Component, useState, useEffect, memo } from 'react';
import Modal from './Modal';
import JobFeed from './JobFeed';
import JobBoard from './JobBoard';
// import ArchiveBoard from './ArchiveBoard';


const MainPage = (props) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');

    useEffect(() => {
      fetch("http://localhost:8080/api/user")
        .then(res => res.json())
        .then(data => {

        })
        .catch(err => console.log(`error when fetching user data: ${err}`))
    })

    
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
            <Modal />
        </div>
        
    </div>
        ); 
    
}


export default MainPage;