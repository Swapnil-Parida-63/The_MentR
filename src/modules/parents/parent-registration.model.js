const mongoose = require('mongoose');
const { REQUIREMENT_STATUSES } = require('../../constants/enums');

const parentRegistrationSchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    studentName: { type: String, required: true, trim: true },
    schoolName: { type: String, required: true, trim: true },
    board: { type: String, required: true, trim: true },
    class: { type: String, required: true, trim: true },
    status: { type: String, enum: REQUIREMENT_STATUSES, default: 'New', index: true }
  },
  { timestamps: true }
);

parentRegistrationSchema.index({ parentName: 'text', phone: 'text', location: 'text', studentName: 'text', schoolName: 'text', board: 'text', class: 'text' });

const ParentRegistration = mongoose.model('ParentRegistration', parentRegistrationSchema);

module.exports = { ParentRegistration };
