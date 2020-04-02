const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/Gram');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .create({ ...req.body, user: req.user._id })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Gram
      .find()
      .then(grams => res.send(grams))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Gram
      .findById({ _id: req.params.id, user: req.user_id })
      .populate('user')
      .populate({
        path: 'comments',
        populate: { path: 'commentedBy' }
      })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .get('/popular', (req, res, next) => {
    Gram  
      .find()
      .mostComments()
      .then(grams => res.send(grams))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Gram
      .find()
      .mostComments()
      .then(grams => res.send(grams))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Gram
      .findOneAndUpdate({
        _id: req.params.id,
        user: req.user._id
      }, req.body, { new: true })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Gram
      .findByIdAndDelete({
        _id: req.params.id,
        author: req.user._id
      })
      .then(gram => res.send(gram))
      .catch(next);
  });
