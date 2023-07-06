const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /launches/:id', () => {
  const completeLaunchData = {
    mission: 'Baddest of them all',
    rocket: 'bddst',
    target: 'Kepler-442 b',
    launchDate: 'January 17,2030',
  };

  const launchDataWithoutDate = {
    mission: 'Baddest of them all',
    rocket: 'bddst',
    target: 'Kepler-442 b',
  };

  const launchDataWithInvalidDate = {
    mission: 'Baddest of them all',
    rocket: 'bddst',
    target: 'Kepler-442 b',
    launchDate: 'January 17,2k30',
  };

  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test('It should catch missing required prop', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });

  test('It should catch invalid date', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: 'Invalid launch date' });
  });
});
