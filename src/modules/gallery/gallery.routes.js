const controller = require('./gallery.controller');
const { gallerySchemas } = require('../shared/simple-crud.validation');
const { buildAdminCrudRoutes } = require('../shared/simple-crud.routes');

module.exports = buildAdminCrudRoutes(controller, gallerySchemas, { publicList: true });
