const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import the chat handler
const { chatHandler } = require('./src/backend/chat.js');

app.post('/api/chat', async (req, res) => {
  console.log('📥 Received chat request:', req.body);
  console.log('🔑 Environment check:');
  console.log('  - GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('  - OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing');
  
  try {
    await chatHandler(req, res);
  } catch (error) {
    console.error('💥 Server error:', error);
    res.status(500).json({
      response: "Server error occurred",
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment loaded: ${process.env.NODE_ENV || 'development'}`);
  console.log('🔗 Test endpoint: http://localhost:' + PORT + '/api/chat');
});
