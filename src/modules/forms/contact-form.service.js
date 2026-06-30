const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { ContactForm } = require('./contact-form.model');

const contactFormService = new CrudService(new BaseRepository(ContactForm, ['name', 'phone', 'email', 'message', 'status']), 'Contact form');

module.exports = { contactFormService };
