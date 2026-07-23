const mongoose = require('mongoose');

const pricingLeadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true, required: true },
    isParent: { type: Boolean, default: false },
    boards: [{ type: String, trim: true }],
    classes: [{ type: String, trim: true }],
    subjects: [{ type: String, trim: true }],
    categories: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

pricingLeadSchema.index({ fullName: 'text', phone: 'text', email: 'text' });

const PricingLead = mongoose.model('PricingLead', pricingLeadSchema);

module.exports = { PricingLead };
