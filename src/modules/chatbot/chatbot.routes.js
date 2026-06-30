const express = require('express');
const controller = require('./chatbot.controller');

const router = express.Router();

router.post('/chat', controller.chat);

module.exports = router;
