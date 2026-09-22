const Dataset = require('../models/Dataset');

// @desc    Get all datasets with search & category filter
// @route   GET /api/datasets
// @access  Public
exports.getDatasets = async (req, res) => {
  try {
    const { category, format, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (format && format !== 'All') {
      query.format = format;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } }
      ];
    }

    const datasets = await Dataset.find(query).sort({ createdAt: -1 });
    res.json(datasets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dataset by ID
// @route   GET /api/datasets/:id
// @access  Public
exports.getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.json(dataset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create dataset entry
// @route   POST /api/datasets
// @access  Private (Researcher, Policymaker, Admin, Institution)
exports.createDataset = async (req, res) => {
  try {
    const { title, description, format, category, spatialCoverage, fileSize, downloadUrl, provider, license } = req.body;

    const dataset = new Dataset({
      title,
      description,
      format: format || 'GeoJSON',
      category,
      spatialCoverage: spatialCoverage || 'National',
      fileSize: fileSize || '12.4 MB',
      downloadUrl: downloadUrl || 'https://geojson.org/',
      provider: provider || req.user.organization || 'Geospatial Innovation Lab',
      authorId: req.user._id,
      license: license || 'Open Government Data License (OGDL)'
    });

    const createdDataset = await dataset.save();
    res.status(201).json(createdDataset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update dataset
// @route   PUT /api/datasets/:id
// @access  Private (Admin / Provider)
exports.updateDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    if (req.user.role !== 'Admin' && dataset.authorId && dataset.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this dataset' });
    }

    dataset.title = req.body.title || dataset.title;
    dataset.description = req.body.description || dataset.description;
    dataset.format = req.body.format || dataset.format;
    dataset.category = req.body.category || dataset.category;
    dataset.spatialCoverage = req.body.spatialCoverage || dataset.spatialCoverage;
    dataset.fileSize = req.body.fileSize || dataset.fileSize;
    dataset.downloadUrl = req.body.downloadUrl || dataset.downloadUrl;
    dataset.provider = req.body.provider || dataset.provider;

    const updatedDataset = await dataset.save();
    res.json(updatedDataset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete dataset
// @route   DELETE /api/datasets/:id
// @access  Private (Admin / Provider)
exports.deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    if (req.user.role !== 'Admin' && dataset.authorId && dataset.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this dataset' });
    }

    await Dataset.deleteOne({ _id: dataset._id });
    res.json({ message: 'Dataset removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Increment dataset download count
// @route   POST /api/datasets/:id/download
// @access  Public
exports.incrementDownloadCount = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    dataset.downloadCount = (dataset.downloadCount || 0) + 1;
    await dataset.save();

    res.json({ downloadCount: dataset.downloadCount, downloadUrl: dataset.downloadUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
