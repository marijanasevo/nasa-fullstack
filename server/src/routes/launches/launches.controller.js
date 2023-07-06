const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpPostLaunch(req, res) {
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

  const result = addNewLaunch(req.body);
  return res.status(201).json(result);
}

module.exports = { httpGetAllLaunches, httpPostLaunch };
