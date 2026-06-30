const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./assessment-visit.controller');
const {
  assessmentVisitIdSchema,
  createAssessmentVisitSchema,
  listAssessmentVisitSchema,
  updateAssessmentVisitSchema
} = require('./assessment-visit.validation');

const router = express.Router();

router.use(authenticate, authorize('Admin'));
router.route('/')
  .post(validate(createAssessmentVisitSchema), controller.create)
  .get(validate(listAssessmentVisitSchema), controller.list);

router.route('/:id')
  .get(validate(assessmentVisitIdSchema), controller.get)
  .patch(validate(updateAssessmentVisitSchema), controller.update)
  .delete(validate(assessmentVisitIdSchema), controller.remove);

module.exports = router;
