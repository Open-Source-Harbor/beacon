import React, { Component } from 'react';

class JobFeed extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="jobFeed">
                <JobFeedElem />
			</div>
		);
	}
}

class JobFeedElem extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="jobFeedElem">
                {/* <img alt="coming soon" />
                <div className="jobElemTitle">                
                    <h1>Job Title</h1>
                    <h2>Company</h2>
                    <h3>Location</h3>
                </div> */}
                <p>This is the feed</p>
			</div>
		);
	}
}

export default JobFeed;
