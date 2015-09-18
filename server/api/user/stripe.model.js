'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StripeTransactionSchema = new Schema({
  refId: String,
  cusId: String,
  object: String,
  amount: Number,
  email: String,
  description: String,
  status: String,
  created: Number,
  response: String
});

module.exports = mongoose.model('Stripe', StripeTransactionSchema);