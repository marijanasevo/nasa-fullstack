// server express
const path = require('path');
const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router');

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(express.static(publicPath));
app.use('/planets', planetsRouter);

module.exports = app;
