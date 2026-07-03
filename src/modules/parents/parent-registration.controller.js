const { createCrudController } = require('../../controllers/crud.controller');
const { parentRegistrationService } = require('./parent-registration.service');

module.exports = createCrudController(parentRegistrationService);
