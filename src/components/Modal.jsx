import React, { Component } from 'react';
import ToDo from "./ToDo"

class Modal extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="modal">
                <div className="modalHeader"> 
                    {/* <img alt="coming soon" /> */}
                    <div className="modalTitle">                
                        <h1>Job Title</h1>
                        <h2>Company</h2>
                        <h3>Location</h3>
                    </div>
                </div>
                
				<div className="inputBoxes">
                    <form>
                        <div>
                            <span>Job URL: </span>
                            <input type="url"/>
                        </div>
                        <div>
                        <span>Salary: </span>
                            <input type="text"/>
                        </div>
                        <div>
                        <span>Notes: </span>
                            <input type="text"/>
                        </div>
                    </form>
                    <div className="toDoList">
                        To Do
                        <ToDo />
                    </div>
                    
				</div>

			</div>
		);
	}
}

export default Modal;
