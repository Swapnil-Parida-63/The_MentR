const { createCrudController } = require('../../controllers/crud.controller');
const { blogService } = require('./blog.service');

module.exports = createCrudController(blogService);
