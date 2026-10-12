const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { CareerLead } = require('./career-lead.model');

const careerLeadRepository = new BaseRepository(CareerLead, ['fullName', 'phone', 'email', 'role']);
const careerLeadService = new CrudService(careerLeadRepository, 'Career lead');

module.exports = { careerLeadRepository, careerLeadService };
