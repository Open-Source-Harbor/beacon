const models = require("../models/userModel");
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

jobController.createJob = async (req, res, next) => {
  try {
    const newJob = req.body;

    await models.Jobs.create(newJob).then((result) => {
      res.locals.job = result;
      return next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while creating a job: ${err}`,
      message: { err: "An error occurred in jobController.createJob. Check server for more details" },
    });
  }
};

jobController.moveJob = async (req, res, next) => {
  try {
    const { job, column, userId, prevColumn, prevBoard } = req.body; // this might be really tricky...
    

    await models.User.findOneAndUpdate(userId, {}).then()

  } catch (err) {
    return next({
      log: `An error occurred while moving a job: ${err}`,
      message: { err: "An error occurred in jobController.moveJob. Check server for more details" },
    });
  }
}

module.exports = userController;