import React, { Component } from 'react';
import ToDo from "./ToDo"

function Modal()  {
	// constructor(props) {
	// 	super(props);
    // }
    // const [editMode, setEditMode] = React.useState(false);

	// render() {
		return (
			<div className="modal">
                <div className="modalHeader"> 
                    <img alt="coming soon" /> */}
                         {/* { editMode ? ( */}
                            <div className="modalTitle">
                                <h1>Job Title</h1>
                                <h2>Company</h2>
                                <h3>Location</h3>
                            </div>
                        {/* ) : (
                            <div className="modalTitle">
                                <input type="text"></input>
                            </div>
                        )} */}
                    
                </div>
                
				<div className="inputBoxes">
                    <form>
                        <div>
                            <span>Job URL </span>
                            <input type="url"/>
                        </div>
                        <div>
                        <span>Salary </span>
                            <input type="text"/>
                        </div>
                        <div>
                        <span>Notes </span>
                            <input type="text"/>
                        </div>
                    </form>
                    <div className="toDoList">
                        <span>To Do </span>
                        <ToDo />
                    </div>
                    <div>
                        <span>Interviews </span>
                        
                    </div>
                    
				</div>

			</div>
		);
	// }
}

export default Modal;
