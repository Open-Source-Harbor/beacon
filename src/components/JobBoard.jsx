import React, { Component } from 'react';
import JobColumn from './JobColumn'

class JobBoard extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="jobBoard">            
				<div>
					<ul>
						<li>
							<button className="plain-button">This is a board</button>
						</li>
					</ul>
				</div>
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
