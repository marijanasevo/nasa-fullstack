const mongoose = require('mongoose');

// https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype
const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
    // min: 0,
    // max: 999
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Planet'
    type: String,
  },
  customers: {
    type: Array,
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
    default: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model('Launch', launchesSchema);

// Singular name of the collection this model represents. Mongoose will lowercase it, make it plural and talk to the collection with that name
