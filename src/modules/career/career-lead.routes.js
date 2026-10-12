const express = require('express');
const careerLeadController = require('./career-lead.controller');

const router = express.Router();

router.post('/', careerLeadController.create);
router.get('/', careerLeadController.list);
router.get('/:id', careerLeadController.get);

module.exports = router;
