const mongoose = require('mongoose');

const organogramSchema = new mongoose.Schema(
  {
    departmentName: { type: String, required: true, trim: true },
    parentDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganogramDepartment', default: null, index: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

const OrganogramDepartment = mongoose.model('OrganogramDepartment', organogramSchema);

module.exports = { OrganogramDepartment };
