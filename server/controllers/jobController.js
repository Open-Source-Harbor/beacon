const models = require("../models/model.js");
const jobController = {};

// jobController.getJobs = async (req, res, next) => {
//   try {
//     const response = await fetch("", {

//     })
//     const jobs = response.json();

//     const jobArr = [];

//     for (let i = 0; i < jobs.length - 1; i++) {
//       jobArr.push(await models.Jobs.create(job[i]))
//     }

//     res.locals.jobs = jobArr;
//     return next();

//   } catch (err) {
//     return next({
//       log: `An error occurred while fetching jobs: ${err}`,
//       message: { err: "An error occurred in jobController.getJobs. Check server for more details" },
//     });
//   }
// }
jobController.getJobs = async (req, res, next) => {
  try {

    const user = res.locals.user;
    

    models.Job.find({}, (err, result) => {
      res.locals.jobs = result;
      console.log('all jobs ',result)
      return next();
    })

  } catch (err) {
    return next({
      log: `An error occurred while fetching jobs: ${err}`,
      message: { err: "An error occurred in jobController.getAllJob. Check server for more details" },
    });
  }
}

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

// createJob needs these inputs:
// {
//   newJob: {
//     ...
//   },
//   userId: "userIdlongnumber..."
// }

jobController.createJob = async (req, res, next) => {
  console.log('createJob invoked')
  try {
    const { newJob, userId} = req.body;

    models.Job.create({...newJob}, async (err, result) => {
      res.locals.job = result;
      console.log('job creation result', result)
      await models.User.findOneAndUpdate({ _id: userId }, {$push: { 'boards.0.interestedIn': result._id }});
      return next();
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
    const { userId, jobId, prevCol, prevIndex, newCol, newIndex, boardIndex } = req.body; // this might be really tricky...
    
    if (prevCol !== 'interestedIn' && prevCol !== 'appliedFor' && prevCol !== 'upcomingInterview' && prevCol !== 'offers') return next();
    if (newCol !== 'interestedIn' && newCol !== 'appliedFor' && newCol !== 'upcomingInterview' && newCol !== 'offers') return next();

    const job = await models.Job.findOneAndUpdate({ _id: jobId }, { column: newCol })
    const user = await models.User.findOne({ _id: userId });

    const newBoards = user.boards[0];
    newBoards[prevCol].splice(prevIndex, 1);
    newBoards[newCol].splice(newIndex, 0, jobId);

    const newUser = await models.User.findOne({ _id: userId }, { boards: newBoards });

    res.locals.user = newUser;
    res.locals.job = job;
    return next();

  } catch (err) {
    return next({
      log: `An error occurred while moving a job: ${err}`,
      message: { err: "An error occurred in jobController.moveJob. Check server for more details" },
    });
  }
}

jobController.moveToArchived = async (req, res, next) => {
  try {
    if (res.locals.user) return next();
    const { userId, jobId, prevCol, prevIndex, newCol, newIndex, boardIndex } = req.body;

    if (newCol !== 'archived') {
      return next({
        log: 'Some inputs for moving a job are wrong!!',
        message: { err: "Inputs for moving a job are wrong. In moveToArchived, the newCol is not archived." },
      });
    }

    //// logic to move from column to archived...


  } catch (err) {
    return next({
      log: `An error occurred while moving a job to archived: ${err}`,
      message: { err: "An error occurred in jobController.moveToArchived. Check server for more details" },
    });
  }
}

module.exports = jobController;