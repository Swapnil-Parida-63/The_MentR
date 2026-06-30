const { createCrudController } = require('../../controllers/crud.controller');
const { galleryService } = require('./gallery.service');

module.exports = createCrudController(galleryService);
