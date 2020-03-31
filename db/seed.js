const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5 } = {}) => {
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
};
