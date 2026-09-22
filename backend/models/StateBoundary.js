const mongoose = require('mongoose');

const stateBoundarySchema = new mongoose.Schema({
  stateName: {
    type: String,
    required: [true, 'State name is required'],
    trim: true
  },
  stateCode: {
    type: String,
    required: [true, 'State code is required'],
    unique: true
  },
  lgdCode: {
    type: Number,
    required: true,
    unique: true
  },
  censusCode: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['State', 'Union Territory'],
    default: 'State'
  },
  capital: {
    type: String,
    default: ''
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Polygon', 'MultiPolygon'],
      default: 'Polygon'
    },
    coordinates: {
      type: Array,
      required: true
    }
  }
}, {
  timestamps: true
});

// Explicit Indexes for performance & geospatial queries
stateBoundarySchema.index({ censusCode: 1 });
stateBoundarySchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('StateBoundary', stateBoundarySchema);
