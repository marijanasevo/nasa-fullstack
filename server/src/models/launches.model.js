const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS2',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['NASA', 'SpaceX'],
  upcoming: true,
  success: true,
};

const launch1 = {
  flightNumber: 101,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS2',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['NASA', 'SpaceX'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);
saveLaunch(launch1);

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet found');
  }

  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort('-flightNumber');

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    upcoming: true,
    success: true,
    customers: ['NASA', 'ExploreX'],
  });

  await saveLaunch(newLaunch);

  return newLaunch;
}

async function abortLaunch(id) {
  const res = await launches.updateOne(
    {
      flightNumber: id,
    },
    {
      success: false,
      upcoming: false,
    }
  );

  return res.modifiedCount === 1;
}

async function existsLaunchById(id) {
  return await launches.findOne(
    {
      flightNumber: id,
    },
    {
      __v: 0,
      _id: 0,
    }
  );
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
  existsLaunchById,
};
