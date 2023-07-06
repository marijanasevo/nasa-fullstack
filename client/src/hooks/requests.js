const API_URL = 'http://localhost:8000';

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(API_URL + '/planets');
  const planets = await response.json();
  return planets;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(API_URL + '/launches');
  const launches = await response.json();
  console.log(launches);
  return launches.sort(
    (launchA, launchB) => launchA.flightNumber - launchB.flightNumber
  );
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(API_URL + '/launches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
