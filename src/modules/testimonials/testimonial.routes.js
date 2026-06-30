const controller = require('./testimonial.controller');
const { testimonialSchemas } = require('../shared/simple-crud.validation');
const { buildAdminCrudRoutes } = require('../shared/simple-crud.routes');

module.exports = buildAdminCrudRoutes(controller, testimonialSchemas, { publicList: true });
