const express = require('express');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./thementr-online.controller');
const { teacherSearchSchema } = require('./thementr-online.validation');

const router = express.Router();

router.get('/teachers', validate(teacherSearchSchema), controller.searchTeachers);

module.exports = router;
