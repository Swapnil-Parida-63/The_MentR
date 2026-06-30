const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const controller = require('./avsar.controller');

const router = express.Router();

router.get('/dashboard', authenticate, authorize('Admin'), controller.dashboard);

module.exports = router;
