const {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
  existsLaunchById,
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpPostLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === 'Invalid Date') {
    res.status(400).json({ error: 'Invalid launch date' });
  }

  const result = await scheduleNewLaunch(req.body);
  console.log(result);
  return res.status(201).json(result);
}

async function httpDeleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existsLaunch = await existsLaunchById(launchId);

  if (!existsLaunch) {
    return res.status(404).json({ error: 'No launch with id ' + launchId });
  }

  const aborted = await abortLaunch(launchId);

  if (!aborted) return res.status(404).json({ error: 'Something went wrong' });

  return res.status(200).json({ ok: aborted });
}

module.exports = { httpGetAllLaunches, httpPostLaunch, httpDeleteLaunch };
