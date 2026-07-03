const mongoose = require('mongoose');
const { REQUIREMENT_STATUSES } = require('../../constants/enums');

const parentRequirementSchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    location: { type: String, trim: true },
    studentName: { type: String, trim: true, default: '' },
    specificSubject: { type: String, trim: true, default: '' },
    board: { type: String, required: true, trim: true },
    class: { type: String, required: true, trim: true },
    subjects: [{ type: String, trim: true }],
    learningMode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Offline' },
    preferredTiming: { type: String, trim: true },
    additionalNotes: { type: String, trim: true },
    status: { type: String, enum: REQUIREMENT_STATUSES, default: 'New', index: true }
  },
  { timestamps: true }
);

parentRequirementSchema.index({ parentName: 'text', phone: 'text', email: 'text', location: 'text', board: 'text', class: 'text', subjects: 'text', studentName: 'text', specificSubject: 'text' });

const ParentRequirement = mongoose.model('ParentRequirement', parentRequirementSchema);

module.exports = { ParentRequirement };
