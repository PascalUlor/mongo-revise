const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('[GET] / for valid endpoints works', async () => {
    const res = await request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.message).toEqual('Welcome to API root');
  });
  it('[GET] / Fails if endpoint is invalid', (done) =>
    request(server).get('/wrong').expect(404).end(done));
});
