const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { ParentRequirement } = require('./parent-requirement.model');

const parentRequirementRepository = new BaseRepository(ParentRequirement, ['parentName', 'phone', 'email', 'location', 'board', 'class', 'subjects']);
const parentRequirementService = new CrudService(parentRequirementRepository, 'Parent requirement');

module.exports = { parentRequirementRepository, parentRequirementService };
