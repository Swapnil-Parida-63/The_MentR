const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    dob: { type: Date },
    currentAddress: { type: String, trim: true },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    boardsToTeach: [{ type: String, trim: true }],
    boardsAlreadyTaught: [{ type: String, trim: true }],
    classesToTeach: [{ type: String, trim: true }],
    classesAlreadyTaught: [{ type: String, trim: true }],
    subjectsToTeach: [{ type: String, trim: true }],
    subjectsPreviouslyTaught: [{ type: String, trim: true }],
    mediumOfInstruction: [{ type: String, trim: true }],
    mostComfortableMedium: { type: String, trim: true },
    preferredLocations: [{ type: String, trim: true }],
    verificationStatus: {
      type: String,
      enum: ['Pending', 'Verified', 'Rejected'],
      default: 'Pending',
      index: true
    }
  },
  { timestamps: true }
);

teacherSchema.index({ 
  firstName: 'text', 
  lastName: 'text', 
  email: 'text', 
  phone: 'text', 
  currentAddress: 'text', 
  boardsToTeach: 'text', 
  classesToTeach: 'text',
  subjectsToTeach: 'text'
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = { Teacher };
