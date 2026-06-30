const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { Gallery } = require('./gallery.model');

const galleryService = new CrudService(new BaseRepository(Gallery, ['title', 'category']), 'Gallery item');

module.exports = { galleryService };
