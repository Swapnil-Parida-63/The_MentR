const { createCrudController } = require('../../controllers/crud.controller');
const { olympiadService, participantService, resultService, studyMaterialService } = require('./olympiad.service');

module.exports = {
  olympiads: createCrudController(olympiadService),
  participants: createCrudController(participantService),
  results: createCrudController(resultService),
  studyMaterials: createCrudController(studyMaterialService)
};
