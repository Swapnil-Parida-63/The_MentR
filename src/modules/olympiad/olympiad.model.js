const mongoose = require('mongoose');
const { CONTENT_STATUSES } = require('../../constants/enums');

const olympiadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    month: { type: String, required: true, trim: true },
    examDate: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    status: { type: String, enum: CONTENT_STATUSES, default: 'Draft', index: true }
  },
  { timestamps: true }
);

const studyMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    olympiad: { type: mongoose.Schema.Types.ObjectId, ref: 'Olympiad' },
    fileUrl: { type: String, required: true, trim: true },
    status: { type: String, enum: CONTENT_STATUSES, default: 'Draft' }
  },
  { timestamps: true }
);

const participantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    olympiad: { type: mongoose.Schema.Types.ObjectId, ref: 'Olympiad', required: true },
    class: { type: String, required: true, trim: true },
    school: { type: String, trim: true },
    status: { type: String, enum: ['Registered', 'Confirmed', 'Cancelled'], default: 'Registered' }
  },
  { timestamps: true }
);

const resultSchema = new mongoose.Schema(
  {
    olympiad: { type: mongoose.Schema.Types.ObjectId, ref: 'Olympiad', required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'OlympiadParticipant', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, min: 1 },
    status: { type: String, enum: CONTENT_STATUSES, default: 'Draft' }
  },
  { timestamps: true }
);

const Olympiad = mongoose.model('Olympiad', olympiadSchema);
const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
const OlympiadParticipant = mongoose.model('OlympiadParticipant', participantSchema);
const OlympiadResult = mongoose.model('OlympiadResult', resultSchema);

module.exports = { Olympiad, OlympiadParticipant, OlympiadResult, StudyMaterial };
