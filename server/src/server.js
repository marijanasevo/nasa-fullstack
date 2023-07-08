// server http
const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  'mongodb+srv://mars:tolqkzcRMBlBblUQ@cluster11.r48b293.mongodb.net/nasa-fullstack?retryWrites=true&w=majority';

const server = http.createServer(app);

// mongoose.connection.on('open', () => {
//   console.log('MongoDB connection ready');
// });

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

async function loadResources() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log('Listening on a port:', PORT);
  });
}

loadResources();
