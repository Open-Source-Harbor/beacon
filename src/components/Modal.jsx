import React, { Component } from 'react';
import ToDo from "./ToDo"

function Modal (props) {

    const { setOpen, job } = props;
    // const [notes, setNotes] = React.useState(job.notes);
    // const [newNote, setNewNote] = React.useState('')


    const [longNote, setLongNote] = React.useState(job.longNotes);
;
    // React.useEffect(() => {
    //     setNotes(job.notes);
    // })
    
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setNotes([
    //         ...notes,
    //         newNote
    //     ])
    //     saveNote();

    //     const element = document.getElementById('textareaNote');
    //     element.value = '';
    //     console.log('element', element)
    //     console.log('value', element.value)
    //     const other = document.getElementById('inputNote');
    //     console.log('other ',other)
    //   }
    
    //   const handleChange = (e) => {
    //       console.log('e target', e.target)
    //     const { value } = e.target;
    //     setNewNote(value);
    //   }

      const handleChange = (e) => {
        console.log('e target', e.target)
        const { value } = e.target;
        setLongNote(value);
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            // setNotes([
            //     ...notes,
            //     newNote
            // ])
            saveNote();
    
            // const element = document.getElementById('textareaNote');
            // element.value = '';
            // console.log('element', element)
            // console.log('value', element.value)
            // const other = document.getElementById('inputNote');
            // console.log('other ',other)
          }
        
    
      const saveNote = async () => {
        const response = await fetch('/api/addNote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ jobId: job._id, longNotes: longNote })
        })
        const parsedResp = await response.json();

        console.log('parsed Reponse', parsedResp)
        
        props.fetchData();
        // setNewNote('');
      }


    // console.log('did the job come through in modal??', job)

	// render() {
		return (
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">
            <h2 id="modalTitle">
              {job.title}
              <span className="close">
                <button className="closeButton" onClick={() => setOpen(false)}>
                  X
                </button>
              </span>
            </h2>

            <h3 id="modalCompany">{job.company}</h3>
            <h4 id="modalLocation">{job.location}</h4>
            <a id="viewJob" href={job.url}>
              View Job Posting
            </a>
          </div>
        </div>

        <div className="inputBoxes">
          <form>
            <div className="modalButtonContainer">
              <h2 id="modalNotes">Notes </h2>
              <textarea
                id="textareaNote"
                rows="10"
                cols="50"
                value={longNote}
                onChange={handleChange}
              />
              <input
                id="inputNote"
                type="submit"
                value="Save"
                onClick={() => {
                  handleSubmit();
                  setOpen(false);
                }}
              />
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
          {/* {notes.map(note => {
                        return <div>{note}</div>
                    })} */}
        </div>
      </div>
    );
	// }
}

export default Modal;
