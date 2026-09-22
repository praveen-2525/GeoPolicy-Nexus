const express = require('express');
const router = express.Router();
const {
  getPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
  simulatePolicy
} = require('../controllers/policyController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getPolicies);
router.post('/simulate', simulatePolicy);
router.get('/:id', getPolicyById);

router.post('/', protect, authorize('Admin', 'Policymaker', 'Institution'), createPolicy);
router.put('/:id', protect, authorize('Admin', 'Policymaker', 'Institution'), updatePolicy);
router.delete('/:id', protect, authorize('Admin', 'Policymaker', 'Institution'), deletePolicy);

module.exports = router;
