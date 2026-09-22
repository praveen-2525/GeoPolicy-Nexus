const mongoose = require('mongoose');

const villageBoundarySchema = new mongoose.Schema({
  villageName: {
    type: String,
    required: [true, 'Village name is required'],
    trim: true
  },
  villageCode: {
    type: String,
    required: [true, 'Village code is required']
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
  subDistrictCode: {
    type: String,
    required: [true, 'Parent SubDistrict code is required']
  },
  subDistrictName: {
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
  ulpinPrefix: {
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

// Explicit Indexes for required queries: villageCode, subDistrictCode, districtCode, stateCode, censusCode & 2dsphere
villageBoundarySchema.index({ villageCode: 1 });
villageBoundarySchema.index({ subDistrictCode: 1 });
villageBoundarySchema.index({ districtCode: 1 });
villageBoundarySchema.index({ stateCode: 1 });
villageBoundarySchema.index({ censusCode: 1 });
villageBoundarySchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('VillageBoundary', villageBoundarySchema);
