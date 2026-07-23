const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./pricing-lead.controller');
const {
  createPricingLeadSchema,
  listPricingLeadSchema,
  pricingLeadIdSchema,
  updatePricingLeadSchema
} = require('./pricing-lead.validation');

const router = express.Router();

router.post('/', validate(createPricingLeadSchema), controller.create);

router.use(authenticate, authorize('Admin'));
router.get('/', validate(listPricingLeadSchema), controller.list);
router.route('/:id')
  .get(validate(pricingLeadIdSchema), controller.get)
  .patch(validate(updatePricingLeadSchema), controller.update)
  .delete(validate(pricingLeadIdSchema), controller.remove);

module.exports = router;
