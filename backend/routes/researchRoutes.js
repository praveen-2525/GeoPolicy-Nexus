const express = require('express');
const router = express.Router();
const {
  getResearchPapers,
  getResearchPaperById,
  createResearchPaper,
  updateResearchPaper,
  deleteResearchPaper
} = require('../controllers/researchController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getResearchPapers);
router.get('/:id', getResearchPaperById);

router.post('/', protect, authorize('Admin', 'Researcher', 'Institution'), createResearchPaper);
router.put('/:id', protect, authorize('Admin', 'Researcher', 'Institution'), updateResearchPaper);
router.delete('/:id', protect, authorize('Admin', 'Researcher', 'Institution'), deleteResearchPaper);

module.exports = router;
