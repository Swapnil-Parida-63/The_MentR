const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./organogram.controller');
const { organogramSchemas } = require('../shared/simple-crud.validation');

const router = express.Router();

router.get('/tree', controller.tree);
router.use(authenticate, authorize('Admin'));
router.route('/').post(validate(organogramSchemas.create), controller.create).get(validate(organogramSchemas.list), controller.list);
router.route('/:id').get(validate(organogramSchemas.get), controller.get).patch(validate(organogramSchemas.update), controller.update).delete(validate(organogramSchemas.get), controller.remove);

module.exports = router;
