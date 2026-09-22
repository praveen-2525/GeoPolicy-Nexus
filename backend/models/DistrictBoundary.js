const mongoose = require('mongoose');

const districtBoundarySchema = new mongoose.Schema({
  districtName: {
    type: String,
    required: [true, 'District name is required'],
    trim: true
  },
  districtCode: {
    type: String,
    required: [true, 'District code is required']
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
  stateCode: {
    type: String,
    required: [true, 'Parent State code is required']
  },
  stateName: {
    type: String,
    required: true
  },
  headquarters: {
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

// Explicit Indexes for required queries: districtCode, stateCode, censusCode & 2dsphere
districtBoundarySchema.index({ districtCode: 1 });
districtBoundarySchema.index({ stateCode: 1 });
districtBoundarySchema.index({ censusCode: 1 });
districtBoundarySchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('DistrictBoundary', districtBoundarySchema);
