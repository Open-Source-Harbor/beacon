import React from 'react';
import Header from './HeaderContainer.jsx'
import Main from './MainContainer.jsx'
import Footer from './FooterContainer.jsx'
import CreateModal from '../components/CreateModal.jsx'
import '../App.scss';

function App() {
  const [open, setOpen] = React.useState(false);
  const [fields, setFields] = React.useState({
    title: '',
    company: '',
    location: '',
    url: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveJob();
    setOpen(false); // Close modal on submit
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  }

  const saveJob = async () => {
    const response = await fetch('/api/createJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newJob: fields, userId: '5f75e7b2d3a398548e7addf1' })
    })
    const parsedResp = response.json();

    setFields({
      title: '',
      company: '',
      location: '',
      postURL: '',
    })
  }

  return (
    <div className="App">
      { open ? (
        <CreateModal handleChange={handleChange} handleSubmit={handleSubmit}/>
      ) : null}
      <Header openModal={setOpen}/>
      <Main newJobAdded={open}/>
      <Footer />
    </div>
  );
}

export default App;
