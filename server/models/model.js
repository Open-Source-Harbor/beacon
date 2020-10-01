const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://beacon:beacon@beacon-0.bfq4r.mongodb.net/beacon?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
	// options for the connect method to parse the URI
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log('error occured while trying to connect to MONGO_URI: ', err));


const Schema = mongoose.Schema;

const userSchema = new Schema({
  l_id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  email: { type: String, required: true },
  boards: [
    {
      name: { type: String, default: "Board1" },
      interestedIn: [
        {
          type: Schema.Types.ObjectId,
          ref: "job",
        },
      ],
      appliedFor: [
        {
          type: Schema.Types.ObjectId,
          ref: "job",
        },
      ],
      upcomingInterviews: [
        {
          type: Schema.Types.ObjectId,
          ref: "job",
        },
      ],
      offers: [
        {
          type: Schema.Types.ObjectId,
          ref: "job",
        },
      ],
    },
  ],
  archived: [
    {
      type: Schema.Types.ObjectId,
      ref: "job",
    },
  ],
});

const User = mongoose.model('user', userSchema);

const jobSchema = new Schema({
  title: String,
  company: String,
  location: String,
  url: String,
  column: String,
  // columnIndex: Number,
  // logo: String, ??
  // salary: Number, ??
  notes: String,
  todo: [{
    name: String,
    date: Date,
  }],
  interviews: [{
    type: String,
    date: Date,
    location: String,
    notes: String,
    todo: [{
      name: String,
      date: Date,
    }]
  }]
})

const Job = mongoose.model('job', jobSchema);

module.exports = {
  User,
  Job
}

