const { createCrudController } = require('../../controllers/crud.controller');
const { testimonialService } = require('./testimonial.service');

module.exports = createCrudController(testimonialService);
