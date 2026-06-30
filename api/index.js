const { app } = require('../src/app');
const { connectDatabase } = require('../src/config/database');

let isConnected = false;

// Serverless entry point for Vercel ensuring cached MongoDB connection
module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = true;
    } catch (error) {
      console.error('Database connection failed in serverless handler:', error);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }
  return app(req, res);
};
