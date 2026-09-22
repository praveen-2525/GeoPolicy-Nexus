const express = require('express');
const router = express.Router();
const { consultAi } = require('../controllers/aiController');

// POST /api/ai/consult
router.post('/consult', consultAi);

module.exports = router;
