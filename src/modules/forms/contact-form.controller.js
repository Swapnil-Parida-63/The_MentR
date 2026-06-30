const { createCrudController } = require('../../controllers/crud.controller');
const { contactFormService } = require('./contact-form.service');

module.exports = createCrudController(contactFormService);
