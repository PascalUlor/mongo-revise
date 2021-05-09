const request = require('supertest');
const { nanoid } = require('nanoid');
const server = require('../api/server');

const api = request(server);
const baseURL = '/api/v1';

/**
 * @jest-environment node
 */

describe('Test Department endpoint', async () => {
  it('[POST] should create Department if input fields are valid', async () => {
    const response = await api
      .post(`${baseURL}/department`)
      .set('Content-Type', 'application/json')
      .send({
        name: `department ${nanoid(3)}`,
        email: `department${nanoid(3)}@yopmail.com`,
        phone: 123456789,
      });
    expect(response.status).toBe(201);
  });

  it('[GET] should return departs', async () => {
    const response = await api
      .get(`${baseURL}/department`)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
  });
});
