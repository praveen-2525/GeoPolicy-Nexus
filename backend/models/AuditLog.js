const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // For failed logins or unauthenticated requests
  },
  action: {
    type: String,
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Blocked'],
    default: 'Success'
  },
  ipAddress: {
    type: String,
    default: '0.0.0.0'
  },
  userAgent: {
    type: String,
    default: 'Unknown'
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
