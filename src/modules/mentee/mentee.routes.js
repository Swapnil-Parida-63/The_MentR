/**
 * @file mentee.routes.js
 * @description Express Route definitions for Mentee AI Chatbot.
 */

const express = require('express');
const controller = require('./mentee.controller');

const router = express.Router();

/**
 * @route POST /api/mentee/chat (and /api/v1/mentee/chat)
 * @desc Send a message to Mentee (GPT-5.6 Luna)
 * @access Public
 */
router.post('/chat', controller.chat);

module.exports = router;
