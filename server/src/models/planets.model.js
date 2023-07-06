const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

const keplerPlanetsPath = path.join(
  __dirname,
  '..',
  '..',
  'data',
  'kepler_data.csv'
);

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanetsData() {
  new Promise((resolve, reject) => {
    fs.createReadStream(keplerPlanetsPath)
      .pipe(
        parse({
          columns: true,
          comment: '#',
        })
      )
      .on('data', chunk => {
        if (isHabitablePlanet(chunk)) {
          habitablePlanets.push(chunk);
        }
      })
      .on('error', err => {
        console.error(err);
        reject(err);
      })
      .on('end', () => {
        console.log(
          `Number of habitable planets is ${habitablePlanets.length}`
        );
        resolve('loaded');
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = { getAllPlanets, loadPlanetsData };
