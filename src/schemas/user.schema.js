const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

module.exports = User = mongoose.model('user', user);