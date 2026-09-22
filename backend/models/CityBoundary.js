const mongoose = require('mongoose');

const cityBoundarySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, 'City name is required'],
    trim: true
  },
  cityCode: {
    type: String,
    required: [true, 'City code is required']
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
  category: {
    type: String,
    enum: ['Metropolitan', 'Tier 1', 'Tier 2', 'Smart City', 'Municipal Corporation'],
    default: 'Municipal Corporation'
  },
  population: {
    type: Number,
    default: 0
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
      enum: ['Polygon', 'MultiPolygon', 'Point'],
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

// Explicit Indexes for required queries: cityCode, districtCode, stateCode, censusCode & 2dsphere
cityBoundarySchema.index({ cityCode: 1 });
cityBoundarySchema.index({ districtCode: 1 });
cityBoundarySchema.index({ stateCode: 1 });
cityBoundarySchema.index({ censusCode: 1 });
cityBoundarySchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('CityBoundary', cityBoundarySchema);
