const controller = require('./contact-form.controller');
const { contactFormSchemas } = require('../shared/simple-crud.validation');
const { buildAdminCrudRoutes } = require('../shared/simple-crud.routes');

module.exports = buildAdminCrudRoutes(controller, contactFormSchemas, { publicCreate: true });
