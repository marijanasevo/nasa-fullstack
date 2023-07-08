const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const planets = require('./planets.mongo');

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
      .on('data', async planet => {
        if (isHabitablePlanet(planet)) {
          savePlanet(planet);
        }
      })
      .on('error', err => {
        console.error(err);
        reject(err);
      })
      .on('end', async () => {
        const planets = await getAllPlanets();
        `Number of habitable planets is ${planets.length}`;
        planets;
        resolve('loaded');
      });
  });
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    `Could not save a planet ${error}`;
  }
}

module.exports = { getAllPlanets, loadPlanetsData };
