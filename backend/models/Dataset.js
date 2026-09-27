const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Dataset title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Dataset description is required']
  },
  format: {
    type: String,
    enum: ['GeoJSON', 'Shapefile', 'GeoTIFF', 'CSV', 'KML', 'Raster'],
    default: 'GeoJSON'
  },
  category: {
    type: String,
    required: true,
    default: 'Cadastral Maps'
  },
  spatialCoverage: {
    type: String,
    default: 'National Boundary'
  },
  fileSize: {
    type: String,
    default: '45.2 MB'
  },
  downloadUrl: {
    type: String,
    default: 'https://geojson.org/'
  },
  provider: {
    type: String,
    default: 'National Remote Sensing Centre'
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  downloadCount: {
    type: Number,
    default: 120
  },
  license: {
    type: String,
    default: 'Open Government Data License (OGDL)'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dataset', datasetSchema);
