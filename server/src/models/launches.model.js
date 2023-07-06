const launches = new Map();

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

module.exports = { getAllLaunches };
