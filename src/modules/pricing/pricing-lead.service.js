const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { PricingLead } = require('./pricing-lead.model');

const pricingLeadRepository = new BaseRepository(PricingLead, ['fullName', 'phone', 'email']);
const pricingLeadService = new CrudService(pricingLeadRepository, 'Pricing lead');

module.exports = { pricingLeadRepository, pricingLeadService };
