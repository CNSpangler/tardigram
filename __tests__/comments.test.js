const { getUser, getAgent, getComment, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comments routes', async() => {
  it('creates a new comment', async() => {
    const user = await getUser({ username: 'wario' });
    return getAgent()
      .post('/api/v1/comments')
  }
});
