const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hash: { type: String, required: true },
  joined: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
