import React, { Component } from 'react';

class JobFeed extends Component {
  constructor(props) {
  	super(props);
  }

  render() {
    return (
      <div className="jobFeed">
        <JobFeedElem setChanger={this.props.setChanger}/>
      </div>
    );
  }
}

class JobFeedElem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  componentWillMount() {
    fetch('http://localhost:8080/api/feed')
      .then((res) => {
        console.log('MainPage.jsx fetch /feed raw res: ', res);
        return res.json();
      })
      .then((feed) => {
        console.log('MainPage.jsx fetch /feed: ', feed);
        this.setState({
          jobs: feed,
        });
      })
      .catch((err) => console.log(`error when fetching feed data: ${err}`));
  }

  async handleClick(job) {
    console.log('button clicked!', job.title);

    const fields = {
      title: job.title
        .replace(/\<.*?>/gim, '')
        .replace(/developer.*$/gim, 'Developer')
        .replace(/engineer.*$/gim, 'Engineer'),
        company: job.company.display_name,
        location: job.location.display_name,
        url: job.redirect_url,
    };

    console.log('feed job fields', fields);

    async function addJob() {
      try {
      const add = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newJob: fields,
          userId: '5f75e7b2d3a398548e7addf1',
        }),
      };

      const res = await fetch('http://localhost:8080/api/createJob', add);

      const parse = await res.json()
      console.log('added job post from feed', parse)
      

    } catch (err) {
      console.log(err)
    }
    }

    await addJob();
    this.props.setChanger(1);
    window.location.reload()
  }

  render() {
    const jobs = [];
    const jobList = this.state.jobs;
    jobList.forEach((job, i) => {
      jobs.push(
        <div className="jobContainer">
          <button
            class="jobFeedItems"
            key={`job-${i}`}
            id={`job-${i}`}
          >
            <span id="jobFeedTitle">
              {job.title
                .replace(/\<.*?>/gim, "")
                .replace(/developer.*$/gim, "Developer")
                .replace(/engineer.*$/gim, "Engineer")}
            </span>
            <br />
            <span id="jobFeedCompany">{job.company.display_name}</span>
            <span
              className="buttonContainer"
              onClick={(e) => {
                this.handleClick(job);
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-arrow-right-square"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
                />
              </svg>
            </span>
          </button>
          <br />
        </div>
      );
    });
    return (
      <div className="jobFeedElem">
        {/* <img alt="coming soon" />
                <div className="jobElemTitle">                
                    <h1>Job Title</h1>
                    <h2>Company</h2>
                    <h3>Location</h3>
                </div> */}
        <h2>Your Job Feed</h2>
        <div className="jobLIst">{jobs}</div>
      </div>
    );
  }
}

export default JobFeed;
