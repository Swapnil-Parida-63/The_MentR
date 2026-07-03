const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { ParentRegistration } = require('./parent-registration.model');

const parentRegistrationRepository = new BaseRepository(ParentRegistration, ['parentName', 'phone', 'location', 'studentName', 'schoolName', 'board', 'class']);
const parentRegistrationService = new CrudService(parentRegistrationRepository, 'Parent registration');

module.exports = { parentRegistrationRepository, parentRegistrationService };
