const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { Teacher } = require('./teacher.model');

const teacherRepository = new BaseRepository(Teacher, ['fullName', 'email', 'phone', 'city', 'subjects', 'boards', 'classes']);
const teacherService = new CrudService(teacherRepository, 'Teacher');

module.exports = { teacherRepository, teacherService };
