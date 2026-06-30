const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./olympiad.controller');
const { olympiadSchemas, participantSchemas, resultSchemas, studyMaterialSchemas } = require('./olympiad.validation');

const router = express.Router();

function crudRoutes(ctrl, schemas) {
  const r = express.Router();
  r.use(authenticate, authorize('Admin'));
  r.route('/').post(validate(schemas.create), ctrl.create).get(validate(schemas.list), ctrl.list);
  r.route('/:id').get(validate(schemas.get), ctrl.get).patch(validate(schemas.update), ctrl.update).delete(validate(schemas.get), ctrl.remove);
  return r;
}

router.use('/olympiads', crudRoutes(controller.olympiads, olympiadSchemas));
router.use('/study-materials', crudRoutes(controller.studyMaterials, studyMaterialSchemas));
router.use('/participants', crudRoutes(controller.participants, participantSchemas));
router.use('/results', crudRoutes(controller.results, resultSchemas));

module.exports = router;
