const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: {
    type: 'String'
  },
  query: {
    type: 'String'
  },
  related: {
    type: ['String']
  },
  traffic: {
    type: 'String'
  },
  image: {
    type: 'String'
  },
  articleSource: {
    type: 'String'
  },
  articleTitle: {
    type: 'String'
  },
  articleUrl: {
    type: 'String'
  },
  articleImage: {
    type: 'String'
  },
  articleSnippet: {
    type: 'String'
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;