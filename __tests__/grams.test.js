const { getUser, getAgent, getGram, getGrams } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('grams routes', async() => {
  const user = await getUser({ username: 'wario' });
  it('creates a new gram', () => {
    return request(app)
      .post('/api/v1/auth/grams')
      .send({
        user: user._id,
        photoUrl: 'www.placekitten.com',
        caption: 'Chainsaw is the greatest',
        tags: ['#chainsaw', '#blessed']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoUrl: 'www.placekitten.com',
          caption: 'Chainsaw is the greatest',
          tags: ['#chainsaw', '#blessed'],
          __v: 0  
        });
      });
  });
});
