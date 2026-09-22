const mongoose = require('mongoose');

const researchPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Paper title is required'],
    trim: true
  },
  abstract: {
    type: String,
    required: [true, 'Abstract is required']
  },
  author: {
    type: String,
    required: [true, 'Author name is required']
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    enum: ['Land Governance', 'GIS & Remote Sensing', 'Urban Planning', 'Agricultural Policy', 'Climate Resilience', 'Property Rights']
  },
  tags: [{
    type: String
  }],
  publicationDate: {
    type: Date,
    default: Date.now
  },
  doi: {
    type: String,
    default: '10.1016/j.geopol.2026.01.001'
  },
  pdfUrl: {
    type: String,
    default: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  citationCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Published', 'Under Review', 'Draft'],
    default: 'Published'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResearchPaper', researchPaperSchema);
