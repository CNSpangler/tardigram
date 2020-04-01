const { getUser, getAgent, getGram, getComment, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comments routes', async() => {
  it('creates a new comment', async() => {
    const user = await getUser({ username: 'wario' });
    const gram = await getGram({ user: user._id });

    return getAgent()
      .post('/api/v1/comments')
      .send({
        commentBy: user._id,
        gram: gram._id,
        comment: 'I know, right!'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: user._id,
          gram: gram._id,
          comment: 'I know, right!',
          __v: 0
        });
      });
  });

  it('deletes a comment by id', async() => {
    const user = await getUser({ username: 'wario' });
    const comment = await getComment({ commentBy: user._id });

    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: comment._id,
          comment: comment.comment
        });
      });
  });
});
