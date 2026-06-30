const mongoose = require('mongoose');
const { AV_STATUSES } = require('../../constants/enums');

const assessmentVisitSchema = new mongoose.Schema(
  {
    parentRequirement: { type: mongoose.Schema.Types.ObjectId, ref: 'ParentRequirement', required: true, index: true },
    assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true, index: true },
    visitDate: { type: Date, required: true },
    status: { type: String, enum: AV_STATUSES, default: 'Pending', index: true },
    notes: { type: String, trim: true },
    outcome: { type: String, trim: true }
  },
  { timestamps: true }
);

const AssessmentVisit = mongoose.model('AssessmentVisit', assessmentVisitSchema);

module.exports = { AssessmentVisit };
