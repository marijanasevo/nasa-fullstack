const mongoose = require('mongoose');

const MONGO_URL =
  'mongodb+srv://mars:tolqkzcRMBlBblUQ@cluster11.r48b293.mongodb.net/nasa-fullstack?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  mongoConnect,
};
