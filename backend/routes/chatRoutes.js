const express = require('express');
const router = express.Router();
const { handleChatMessage } = require('../controllers/chatController');
const rateLimiter = require('../middleware/rateLimiter');

// Rate limit: 30 chat requests per minute per IP
const chatRateLimiter = rateLimiter({ windowMs: 60 * 1000, max: 30 });

/**
 * @route   POST /api/chat
 * @desc    Process Gemini AI chatbot message
 * @access  Public
 */
router.post('/', chatRateLimiter, handleChatMessage);

module.exports = router;
