const { createCrudController } = require('../../controllers/crud.controller');
const { parentRequirementService } = require('./parent-requirement.service');

module.exports = createCrudController(parentRequirementService);
