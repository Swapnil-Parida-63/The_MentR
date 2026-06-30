const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { AssessmentVisit } = require('./assessment-visit.model');

const assessmentVisitRepository = new BaseRepository(AssessmentVisit, ['status', 'notes', 'outcome']);
const assessmentVisitService = new CrudService(assessmentVisitRepository, 'Assessment visit', {
  populate: ['parentRequirement', 'assignedTeacher']
});

module.exports = { assessmentVisitRepository, assessmentVisitService };
