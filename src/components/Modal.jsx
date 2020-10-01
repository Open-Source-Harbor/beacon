import React, { Component } from 'react';
import ToDo from "./ToDo"

function Modal (props) {

    const { setOpen, job } = props;
    const [notes, setNotes] = React.useState([]);

    // React.useEffect(() => {
    //     setNotes(job)
    // })
    
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     saveJob();
    //     setOpen(false); // Close modal on submit
    //   }
    
    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFields({
    //       ...fields,
    //       [name]: value,
    //     });
    //   }
    
    //   const saveJob = async () => {
    //     const response = await fetch('/api/createJob', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ newJob: fields, userId: '5f75e7b2d3a398548e7addf1' })
    //     })
    //     const parsedResp = response.json();
    
    //     setFields({
    //       title: '',
    //       company: '',
    //       location: '',
    //       postURL: '',
    //     })
    
    //     window.location.reload();
    //     setNewJobAdded(!newJobAdded);
    //   }




    // console.log('did the job come through in modal??', job)

	// render() {
		return (
			<div className="modal">
                <div className="modalHeader"> 
                            <div className="modalTitle">
                            <h2 id="modalTitle">{job.title}</h2>
                            <h3 id="modalCompany">{job.company}</h3>
                            <h4 id="modalLocation">{job.location}</h4>
                            <a id="viewJob" href={job.url}>View Job Posting</a>
                            </div>
                    
                </div>
                
				<div className="inputBoxes">
                    <form>
                        <div>
                            <p>Notes </p>
                            <textarea rows="10" cols="50" placeholder="Add your notes here..." />
                            <input type="submit" value="Save" />
                        </div>
                        {/* <div>
                        <span>Salary </span>
                            <input type="text"/>
                        </div>
                        <div>
                        <span>Notes </span>
                            <input type="text"/>
                        </div> */}
                    </form>
                    {/* <div className="toDoList">
                        <span>To Do </span>
                        <ToDo />
                    </div> */}
                    {/* <div>
                        <span>Interviews </span>
                        
                    </div> */}
                    {job.notes.map(note => {
                        return <div>{note}</div>
                    })}
				</div>
        <div className="close">
          <button className="closeButton" onClick={() => setOpen(false)}>X</button>
        </div>

			</div>
		);
	// }
}

export default Modal;
