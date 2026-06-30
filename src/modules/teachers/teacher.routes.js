const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./teacher.controller');
const { createTeacherSchema, listTeacherSchema, teacherIdSchema, updateTeacherSchema } = require('./teacher.validation');

const router = express.Router();

// Public onboarding endpoint for prospective teachers to apply
router.post('/apply', validate(createTeacherSchema), controller.create);

// Protected administrative endpoints
router.use(authenticate);
router.route('/')
  .post(authorize('Admin'), validate(createTeacherSchema), controller.create)
  .get(authorize('Admin'), validate(listTeacherSchema), controller.list);

router.route('/:id')
  .get(authorize('Admin'), validate(teacherIdSchema), controller.get)
  .patch(authorize('Admin'), validate(updateTeacherSchema), controller.update)
  .delete(authorize('Admin'), validate(teacherIdSchema), controller.remove);

module.exports = router;
