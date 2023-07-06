const launches = new Map();

let latestFlightNumber = 102;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS2',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['NASA', 'SpaceX'],
  upcoming: true,
  success: true,
};

const launch1 = {
  flightNumber: 101,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS2',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['NASA', 'SpaceX'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);
launches.set(launch1.flightNumber, launch1);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber += 1;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
      customer: ['NASA', 'ExploreX'],
    })
  );

  return launches.get(latestFlightNumber);
}

function abortLaunch(id) {
  const launch = launches.get(id);
  launch.success = false;
  launch.upcoming = false;

  return launch;
}

function existsLaunchById(id) {
  return launches.get(id);
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  existsLaunchById,
};
