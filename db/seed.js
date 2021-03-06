const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Gram = require('../lib/models/Gram');
const Comment = require('../lib/models/Comment');

module.exports = async({ usersToCreate = 5, gramsToCreate = 10, commentsToCreate = 25 } = {}) => {
  const loggedInUser = await User.create({
    username: 'wario',
    password: 'itsnotme',
    profilePhotoUrl: 'www.placekitten.com'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.string(),
    password: chance.animal(),
    profilePhotoUrl: chance.url()
  })));

  const tags = ['#blessed', '#ChainsawMeowsacres', '#cantstop', '#wontstop', '#spot4eva', '#booger', '#toto', '#topeka'];

  const grams = await Gram.create([...Array(gramsToCreate)].slice(1).map(() => ({
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    photoUrl: chance.url(),
    caption: chance.sentence(),
    tags: [chance.pickone(tags)]
  })));

  await Comment.create([...Array(commentsToCreate)].slice(1).map(() => ({
    commentBy: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    gram: chance.pickone(grams)._id,
    comment: chance.sentence()
  })));
};
