const { getUser, getAgent, getGram, getGrams } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('grams routes', async() => {
  it('creates a new gram', async() => {
    const user = await getUser({ username: 'wario' });
    return getAgent()
      .post('/api/v1/grams')
      .send({
        user: user._id,
        photoUrl: 'www.placekitten.com',
        caption: 'Chainsaw is the greatest',
        tags: ['chainsaw, blessed']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoUrl: 'www.placekitten.com',
          caption: 'Chainsaw is the greatest',
          tags: ['chainsaw, blessed'],
          __v: 0  
        });
      });
  });
});
