const mongoose = require('mongoose');

const subDistrictBoundarySchema = new mongoose.Schema({
  subDistrictName: {
    type: String,
    required: [true, 'SubDistrict (Tehsil/Taluka) name is required'],
    trim: true
  },
  subDistrictCode: {
    type: String,
    required: [true, 'SubDistrict code is required']
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
  districtCode: {
    type: String,
    required: [true, 'Parent District code is required']
  },
  districtName: {
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

// Explicit Indexes
subDistrictBoundarySchema.index({ subDistrictCode: 1 });
subDistrictBoundarySchema.index({ districtCode: 1 });
subDistrictBoundarySchema.index({ stateCode: 1 });
subDistrictBoundarySchema.index({ censusCode: 1 });
subDistrictBoundarySchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('SubDistrictBoundary', subDistrictBoundarySchema);
