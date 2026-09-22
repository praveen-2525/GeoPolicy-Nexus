const express = require('express');
const router = express.Router();
const {
  getDatasets,
  getDatasetById,
  createDataset,
  updateDataset,
  deleteDataset,
  incrementDownloadCount
} = require('../controllers/datasetController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getDatasets);
router.get('/:id', getDatasetById);
router.post('/:id/download', incrementDownloadCount);

router.post('/', protect, authorize('Admin', 'Researcher', 'Policymaker', 'Institution'), createDataset);
router.put('/:id', protect, authorize('Admin', 'Researcher', 'Policymaker', 'Institution'), updateDataset);
router.delete('/:id', protect, authorize('Admin', 'Researcher', 'Policymaker', 'Institution'), deleteDataset);

module.exports = router;
