const { getUser, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'mario',
        password: 'itsame',
        profilePhotoUrl: 'www.placekitten.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'mario',
          profilePhotoUrl: 'www.placekitten.com',
          __v: 0
        });
      });
  });

  it('logs in a user', async() => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'wario',
        password: 'itsnotme',
        profilePhotoUrl: 'www.placekitten.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'wario',
          profilePhotoUrl: 'www.placekitten.com',
          __v: 0
        });
      });
  });

  it('verifies a logged in user', () => {
    return getAgent()
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'wario',
          profilePhotoUrl: 'www.placekitten.com',
          __v: 0
        });
      });
  });
});
