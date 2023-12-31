// server express
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const publicPath = path.join(__dirname, '..', 'public');
const indexPath = path.join(__dirname, '..', 'public', 'index.html');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(morgan('combined'));
app.use(express.json());

app.use(express.static(publicPath));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.get('/*', (req, res) => {
  res.sendFile(indexPath);
});

module.exports = app;
