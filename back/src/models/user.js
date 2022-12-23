const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: 'Number'
  },
  displayName: {
    type: 'String',
    required: true
  },
  givenName: {
    type: 'String'
  },
  familyName: {
    type: 'String'
  },
  email: {
    type: 'String',
    required: true
  },
  picture: {
    type: 'String',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;