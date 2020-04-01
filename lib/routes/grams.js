const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/Gram');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .create({ ...req.body, author: req.user._id })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Gram
      .find()
      .then(grams => res.send(grams))
      .catch(next);
  });
