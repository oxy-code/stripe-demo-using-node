'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/stripe', controller.stripe);
router.get('/logout', controller.logout);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/login', controller.login);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;