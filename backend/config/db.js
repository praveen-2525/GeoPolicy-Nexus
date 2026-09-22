const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/geopolicy_nexus', {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s if MongoDB is not running
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Connection Warning]: Could not connect to MongoDB database at ${process.env.MONGO_URI}`);
    console.warn(`[Info]: Ensure MongoDB is running locally on port 27017, or update MONGO_URI in backend/.env.`);
  }
};

module.exports = connectDB;
