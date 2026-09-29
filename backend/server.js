const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware - Enhanced CORS configuration for deployed frontend integration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'GeoPolicy Nexus API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/research', require('./routes/researchRoutes'));
app.use('/api/policies', require('./routes/policyRoutes'));
app.use('/api/datasets', require('./routes/datasetRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/boundaries', require('./routes/boundaryRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Express Error Handler]:', err.stack);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` GeoPolicy Nexus Backend Server active on port ${PORT}`);
  console.log(` Healthcheck endpoint: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
