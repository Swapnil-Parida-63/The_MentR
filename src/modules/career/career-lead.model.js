const mongoose = require('mongoose');

const careerLeadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true, required: true },
    role: { type: String, required: true, trim: true },
    openings: { type: Number, default: 1 },
    department: { type: String, trim: true },
    location: { type: String, trim: true },
    experience: { type: String, trim: true }
  },
  { timestamps: true }
);

careerLeadSchema.index({ fullName: 'text', phone: 'text', email: 'text', role: 'text' });

const CareerLead = mongoose.model('CareerLead', careerLeadSchema);

module.exports = { CareerLead };
