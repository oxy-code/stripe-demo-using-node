/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
//if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('fCjBbZA3L27r7bqOVD7td5NUTv9NHNgF2ygWYCT4Je4P7C9hAw2tJo6rpa2r3Xlk', 'base64'),
  audience: 'nZ75IlzdsYsp1lvbyiFC0PQIf6MPXpun'
});

require('./config/express')(app);
require('./routes')(app, jwtCheck);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;