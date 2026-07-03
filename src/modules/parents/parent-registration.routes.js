const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./parent-registration.controller');
const {
  createParentRegistrationSchema,
  listParentRegistrationSchema,
  parentRegistrationIdSchema,
  updateParentRegistrationSchema
} = require('./parent-registration.validation');

const router = express.Router();

router.post('/', validate(createParentRegistrationSchema), controller.create);

router.use(authenticate, authorize('Admin'));
router.get('/', validate(listParentRegistrationSchema), controller.list);
router.route('/:id')
  .get(validate(parentRegistrationIdSchema), controller.get)
  .patch(validate(updateParentRegistrationSchema), controller.update)
  .delete(validate(parentRegistrationIdSchema), controller.remove);

module.exports = router;
