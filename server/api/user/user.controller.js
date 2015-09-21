'use strict';

var _ = require('lodash');
var User = require('./user.model');
var Stripe = require('./stripe.model');

// Get list of users
exports.index = function(req, res) {
	User.find(function (err, users) {
		if(err) { return handleError(res, err); }
		return res.json(200, users);
	});
};

// Get a single user
exports.show = function(req, res) {
	User.findById(req.params.id, function (err, user) {
		if(err) { return handleError(res, err); }
		if(!user) { return res.send(404); }
		return res.json(user);
	});
};

// Creates a new user in the DB.
exports.create = function(req, res) {
	var reqData = req.body;
	var userInfo = {
		name: reqData.name,
		email: reqData.email,
		password: reqData.password,
		role: 'USR'
	};
	var stripe = require('stripe')("sk_test_umAUtcHhZh6oX8MkmVuCRrtH");
	stripe.charges.create({
	  amount: 100,
	  currency: "usd",
	  source: {
	  	object: 'card',
	  	number: reqData.no,
	  	exp_month: reqData.month,
	  	exp_year: reqData.year,
	  	cvc: reqData.cvc,
	  	name: reqData.name
	  },
	  description: "Sample stripe-payment using Node demo App"
	}, function(err, charge) {
		if(err) { return handleError(res, err); }
		Stripe.create({
			refId: charge.id,
			cusId: charge.customer,
			object: charge.object,
			amount: charge.amount,
			email: reqData.email,
			description: charge.description,
			status: charge.status,
			created: charge.created,
			response: JSON.stringify(charge)
		}, function(err, stripeData){ if(err) {return handleError(res, err);} });
		
		User.create(userInfo, function(err, user) {
			if(err) { return handleError(res, err); }
			return res.json(201, {message : "Account has been created successfully."});
		});
	});
	
};

// User Login
exports.login = function(req, res) {
	var user = req.body;
	User.findOne({email: user.email, password: user.password}, function(err, user){
		if (err) {return handleError(err, res);}
		if(!user) { return res.json(500, {message : 'Email or password is wrong!'}); }
		// Need to setup a token https://auth0.com/docs/quickstart/spa/angularjs/nodejs#additional-information
	});
};


// Updates an existing user in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	User.findById(req.params.id, function (err, user) {
		if (err) { return handleError(res, err); }
		if(!user) { return res.send(404); }
		var updated = _.merge(user, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.json(200, user);
		});
	});
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
	User.findById(req.params.id, function (err, user) {
		if(err) { return handleError(res, err); }
		if(!user) { return res.send(404); }
		user.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}