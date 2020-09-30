import React, { Component } from 'react';

class JobColumn extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="jobColumn">
            <p>This is a column</p>
                <JobColumnElem />
			</div>
		);
	}
}

class JobColumnElem extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="jobColumnElem">
                {/* <img alt="coming soon" />
                <div className="jobElemTitle">                
                    <h1>Job Title</h1>
                    <h2>Company</h2>
                    <h3>Location</h3>
                </div> */}
                <p>This is the job</p>
			</div>
		);
	}
}

export default JobColumn;
