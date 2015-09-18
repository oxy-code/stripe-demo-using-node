'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now() },
  modified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', UserSchema);