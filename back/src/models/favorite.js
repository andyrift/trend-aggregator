const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user_id: {
    type: 'Number',
    required: true
  },
  post_id: {
    type: 'String',
    required: true
  }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;