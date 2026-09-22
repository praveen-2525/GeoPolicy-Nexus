const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Policy title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Policy description is required']
  },
  state: {
    type: String,
    required: [true, 'State or Jurisdiction is required']
  },
  jurisdiction: {
    type: String,
    enum: ['National', 'State', 'Municipal', 'Regional'],
    default: 'State'
  },
  category: {
    type: String,
    required: true,
    enum: ['Digital Land Titling', 'Zoning & Master Planning', 'Tenure Security', 'Environmental Protection', 'Taxation & Valuation', 'Rehabilitation']
  },
  status: {
    type: String,
    enum: ['Active', 'Under Review', 'Draft', 'Archived'],
    default: 'Active'
  },
  documentUrl: {
    type: String,
    default: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  effectiveDate: {
    type: Date,
    default: Date.now
  },
  impactMetrics: {
    citizensAffected: { type: String, default: '500,000+' },
    efficiencyGain: { type: String, default: '35%' },
    transparencyScore: { type: String, default: '94%' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Policy', policySchema);
