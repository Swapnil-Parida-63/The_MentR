const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');

function buildAdminCrudRoutes(controller, schemas, options = {}) {
  const router = express.Router();

  if (options.publicList) {
    router.get('/', validate(schemas.list), controller.list);
    router.get('/:id', validate(schemas.get), controller.get);
  }

  if (options.publicCreate) {
    router.post('/', validate(schemas.create), controller.create);
  }

  router.use(authenticate, authorize('Admin'));
  if (!options.publicCreate) router.post('/', validate(schemas.create), controller.create);
  if (!options.publicList) router.get('/', validate(schemas.list), controller.list);
  if (!options.publicList) router.get('/:id', validate(schemas.get), controller.get);
  router.patch('/:id', validate(schemas.update), controller.update);
  router.delete('/:id', validate(schemas.get), controller.remove);

  return router;
}

module.exports = { buildAdminCrudRoutes };
