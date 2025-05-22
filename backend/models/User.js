const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
  occupation: String,
  income: Number,
  caste: String,
  disability: Boolean,
  location: String
});

module.exports = mongoose.model('User', UserSchema);
