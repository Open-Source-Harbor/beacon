const { default: fetch } = require("node-fetch");
const models = require("../models/model.js");
const jobController = {};

jobController.getFeed = async (req, res, next) => {
  try {
    console.log('first line of jobController.getFeed: process.env.BASE_URI: ', process.env.BASE_URI);
    const baseURI = process.env.BASE_URI;
    const appID = process.env.APP_ID;
    const appKey = process.env.APP_KEY;
    const resultsPerPage = 20;
    const keyword0 = "javascript";
    const keyword1 = "developer";
    const exclude0 = "java";
    const location = "london";
    const sortBy = "salary";
    const salaryMin = 60000;
    const fullTime = 1;
    const permanent = 1;
    const contentType = "application/json";
    const fullURI = `${baseURI}app_id=${appID}&app_key=${appKey}&results_per_page=${resultsPerPage}&what=${keyword0}%20${keyword1}&what_exclude=${exclude0}&where=${location}&sort_by=${sortBy}&salary_min=${salaryMin}&full_time=${fullTime}&permanent=${permanent}&content-type=${contentType}`;
    
    // console.log('jobController.getFeed fullURI: ', fullURI);
    
    await fetch(fullURI)
      .then(res => res.json())
      .then(data => {
        // console.log('jobController.getFeed data: ', data)
        // console.log("jobController.getFeed data.results: ", data.results);
        res.locals.feed = data.results;
        // console.log("jobController.getFeed res.locals.feed: ", res.locals.feed);
      })
      .catch(err => console.log(`error occurred during GET request in getFeed: ${err}`))

    return next();
  } catch (err) {
    return next({
      log: `An error occurred while fetching user: ${err}`,
      message: {
        err:
          "An error occurred in userController.getUser. Check server for more details",
      },
    });
  }
};


jobController.getJobs = async (req, res, next) => {
  try {
    // console.log('IN getJobs', )
    const user = res.locals.user;
    const board1 = user.boards[0];
    const archivedIDs = user.archived;


    const interestedIn = await Promise.all(await board1.interestedIn.map(async (jobId) => {
      // console.log('this is the id in the map ', jobId);
      const job = await models.Job.findOne({ _id: jobId });
      // console.log('we got it??', job);
      return job;
    }))

    const appliedFor = await Promise.all(await board1.appliedFor.map(async (jobId) => {
      return await models.Job.findOne({ _id: jobId });
    }))

    const upcomingInterviews = await Promise.all(await board1.upcomingInterviews.map(async (jobId) => {
      return await models.Job.findOne({ _id: jobId });
    }))
    const offers = await Promise.all(await board1.offers.map(async (jobId) => {
      return await models.Job.findOne({ _id: jobId });
    }))
    const archived = await Promise.all(await archivedIDs.map(async (jobId) => {
      return await models.Job.findOne({ _id: jobId });
    }))

    const board = {
      interestedIn,
      appliedFor,
      upcomingInterviews,
      offers,
      archived
    }

    // console.log('entire board!!', board);

    res.locals.jobs = board;
    return next();

  } catch (err) {
    return next({
      log: `An error occurred while fetching jobs: ${err}`,
      message: { err: "An error occurred in jobController.getAllJob. Check server for more details" },
    });
  }
}

// literally fetches all jobs in the database...
// jobController.getAllJobs = async (req, res, next) => {
//   try {

//     models.Job.find({}, (err, result) => {
//       res.locals.jobs = result;
//       console.log('all jobs ',result)
//       return next();
//     })

//   } catch (err) {
//     return next({
//       log: `An error occurred while fetching jobs: ${err}`,
//       message: { err: "An error occurred in jobController.getAllJob. Check server for more details" },
//     });
//   }
// }


jobController.createJob = async (req, res, next) => {
  // console.log('createJob invoked')
  try {
    const { newJob, userId} = req.body;
    console.log('userId in CREATE JOB', userId)
    models.Job.create({...newJob}, async (err, result) => {
      res.locals.job = result;
      // console.log('job creation result', result)
      await models.User.findOneAndUpdate({ _id: userId }, {$addToSet: { 'boards.0.interestedIn': result._id }}, (err, newUser) => {
        // console.log('about to hit next', newUser.boards.interestedIn)
        return next();
      });
    })

  } catch (err) {
    return next({
      log: `An error occurred while creating a job: ${err}`,
      message: { err: "An error occurred in jobController.createJob. Check server for more details" },
    });
  }
};


jobController.moveJob = async (req, res, next) => {
  try {
    const { userId, jobId, prevCol, prevIndex, newCol, newIndex, boardIndex = 0 } = req.body; // this might be really tricky...
    
    // if (prevCol !== 'interestedIn' && prevCol !== 'appliedFor' && prevCol !== 'upcomingInterview' && prevCol !== 'offers') return next();
    // if (newCol !== 'interestedIn' && newCol !== 'appliedFor' && newCol !== 'upcomingInterview' && newCol !== 'offers') return next();

    const job = await models.Job.findOneAndUpdate({ _id: jobId }, { column: newCol })
    const user = await models.User.findOne({ _id: userId });

    console.log('user', user);
    console.log('user.boards', user.boards)
    console.log('prevCol', prevCol, newCol);

    const newBoards = user.boards[0];
    newBoards[prevCol].splice(prevIndex, 1);
    newBoards[newCol].splice(newIndex, 0, jobId);

    const previousColumn = newBoards[prevCol];
    const newColumn = newBoards[newCol];

    const previousColumnField = `boards.0.${prevCol}`;
    const newColumnField = `boards.0.${newCol}`;

    await models.User.findOneAndUpdate({ _id: userId }, { [previousColumnField]: previousColumn, [newColumnField]: newColumn }, (err, newUser) => {
      if (err) console.log(err);
      res.locals.user = newUser;
      res.locals.job = job;
      return next();
    });

  } catch (err) {
    return next({
      log: `An error occurred while moving a job: ${err}`,
      message: { err: "An error occurred in jobController.moveJob. Check server for more details" },
    });
  }
}

jobController.archive = async (req, res, next) => {
  try {
    const { userId, jobId, prevCol, prevIndex, boardIndex = 0 } = req.body;

    models.Job.findOneAndUpdate({ _id: jobId }, { column: 'archived' })
    const user = await models.User.findOne({ _id: userId });

    const newBoards = user.boards[0];
    newBoards[prevCol].splice(prevIndex, 1);
    const previousColumn = newBoards[prevCol];
    const previousColumnField = `boards.0.${prevCol}`;

    await models.User.findOneAndUpdate({ _id: userId }, {$addToSet: { 'archived': jobId }, [previousColumnField]: previousColumn }, (err, newUser) => {
      res.locals.user = newUser;
      return next();
    });

  } catch (err) {
    return next({
      log: `An error occurred while moving a job to archived: ${err}`,
      message: { err: "An error occurred in jobController.moveToArchived. Check server for more details" },
    });
  }
}

module.exports = jobController;
