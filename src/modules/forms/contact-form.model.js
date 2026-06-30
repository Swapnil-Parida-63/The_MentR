const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New', index: true }
  },
  { timestamps: true }
);

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = { ContactForm };
