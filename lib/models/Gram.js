const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  tags: [String],
},  {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'gram'
});

schema.statics.mostComments = function(count = 10) {
  return this
    .aggregate([
      {
        '$group': {
          '_id': '$gram', 
          'mostComments': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'mostComments': -1
        }
      }, {
        '$lookup': {
          'from': 'grams', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'gram'
        }
      }, {
        '$unwind': {
          'path': '$gram'
        }
      }
    ]);
};

module.exports = mongoose.model('Gram', schema);
