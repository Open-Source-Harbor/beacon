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
        postURL: job.redirect_url,
    };

    console.log('feed job fields', fields);

    async function addJob() {
      const add = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newJob: fields,
          userId: '5f75e7b2d3a398548e7addf1',
        }),
      };

      const res = await fetch('http://localhost:8080/api/createJob', add);

      res
        .json()
        .then((res) => console.log('added feed job post', res))
        .catch((err) => console.log(err));
    }

    await addJob();
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
            onClick={(e) => {
              this.handleClick(job);
            }}
          >
            {job.title
              .replace(/\<.*?>/gim, "")
              .replace(/developer.*$/gim, "Developer")
              .replace(/engineer.*$/gim, "Engineer")}
              <br /> @ 
            {job.company.display_name}
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
        <p>Your Job Feed</p>
        <div className="jobLIst">{jobs}</div>
      </div>
    );
  }
}

export default JobFeed;
