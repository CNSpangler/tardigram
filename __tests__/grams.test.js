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

  it('gets all grams', async() => {
    const user = await getUser({ username: 'wario' });
    const grams = await getGrams();

    return getAgent()
      .get('/api/v1/grams')
      .then(res => {
        expect(res.body).toEqual(grams);
      });
  });

  it('gets a gram by id', async() => {
    const user = await getUser({ username: 'wario' });
    const gram = await getGram({ user: user._id });
    // const comments = await getComments({ post: post._id });

    return getAgent()
      .get(`/api/v1/grams/${gram._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...gram,
          user,
          // comments
        });
      });
  });

  it('updates a gram by id', async() => {
    const user = await getUser({ username: 'wario' });
    const gram = await getGram({ user: user._id });

    return getAgent()
      .patch(`/api/v1/grams/${gram._id}`)
      .send({ caption: 'ilu chainsaw' })
      .then(res => {
        expect(res.body).toEqual({
          ...gram,
          caption: 'ilu chainsaw',
        });
      });
  });
});
