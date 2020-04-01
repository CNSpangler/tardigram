const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Gram = require('../lib/models/Gram');

module.exports = async({ usersToCreate = 5, gramsToCreate = 10 } = {}) => {
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
    user: chance.pickone(users),
    photoUrl: chance.url(),
    caption: chance.sentence(),
    tags: [chance.pickone(tags)]
  })));
};
