const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { Olympiad, OlympiadParticipant, OlympiadResult, StudyMaterial } = require('./olympiad.model');

const olympiadService = new CrudService(new BaseRepository(Olympiad, ['title', 'description', 'month', 'status']), 'Olympiad');
const studyMaterialService = new CrudService(new BaseRepository(StudyMaterial, ['title', 'description', 'status']), 'Study material', { populate: ['olympiad'] });
const participantService = new CrudService(new BaseRepository(OlympiadParticipant, ['name', 'email', 'phone', 'class', 'school', 'status']), 'Participant', { populate: ['olympiad'] });
const resultService = new CrudService(new BaseRepository(OlympiadResult, ['status']), 'Result', { populate: ['olympiad', 'participant'] });

module.exports = { olympiadService, participantService, resultService, studyMaterialService };
