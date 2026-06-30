const express = require('express');
const controller = require('./payment.controller');

const router = express.Router();

router.get('/', controller.comingSoon);
router.post('/', controller.comingSoon);

module.exports = router;
