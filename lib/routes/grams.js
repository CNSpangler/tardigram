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
      // .populate('comments')
      .populate('user')
      .then(gram => res.send(gram))
      .catch(next);
  });
