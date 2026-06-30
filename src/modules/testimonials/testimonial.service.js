const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { Testimonial } = require('./testimonial.model');

const testimonialService = new CrudService(new BaseRepository(Testimonial, ['name', 'role', 'message']), 'Testimonial');

module.exports = { testimonialService };
