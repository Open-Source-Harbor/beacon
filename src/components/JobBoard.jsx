import React, { Component } from 'react';
import JobColumn from './JobColumn'

class JobBoard extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="jobBoard">
            <p>This is a board</p>
                <div className="board">                
                    <JobColumn />
                    <JobColumn />
                    <JobColumn />
                    <JobColumn />
                </div>
			</div>
		);
	}
}



export default JobBoard;
