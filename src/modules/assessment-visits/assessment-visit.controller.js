const { createCrudController } = require('../../controllers/crud.controller');
const { assessmentVisitService } = require('./assessment-visit.service');

module.exports = createCrudController(assessmentVisitService);
