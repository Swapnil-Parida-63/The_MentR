const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./parent-requirement.controller');
const {
  createParentRequirementSchema,
  listParentRequirementSchema,
  parentRequirementIdSchema,
  updateParentRequirementSchema
} = require('./parent-requirement.validation');

const router = express.Router();

router.post('/', validate(createParentRequirementSchema), controller.create);

router.use(authenticate, authorize('Admin'));
router.get('/', validate(listParentRequirementSchema), controller.list);
router.route('/:id')
  .get(validate(parentRequirementIdSchema), controller.get)
  .patch(validate(updateParentRequirementSchema), controller.update)
  .delete(validate(parentRequirementIdSchema), controller.remove);

module.exports = router;
