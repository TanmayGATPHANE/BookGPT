const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import the chat handler
const { chatHandler } = require('./src/backend/chat.cjs');
const { missionVisionHandler } = require('./src/backend/missionVision.cjs');
const { generateStakeholderMotivationStrategy } = require('./src/backend/stakeholderMotivation.cjs');

// Test endpoint
app.get('/test', (req, res) => {
  console.log('📍 Test endpoint hit');
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

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

app.post('/api/mission-vision', async (req, res) => {
  console.log('📥 Received mission/vision request:', req.body);
  console.log('🔑 Environment check:');
  console.log('  - GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('  - OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing');
  
  try {
    await missionVisionHandler(req, res);
  } catch (error) {
    console.error('💥 Mission/Vision server error:', error);
    res.status(500).json({
      options: [],
      success: false,
      error: error.message
    });
  }
});

app.post('/api/stakeholder-motivation', async (req, res) => {
  console.log('📥 Received stakeholder motivation request:', req.body);
  console.log('🔑 Environment check:');
  console.log('  - GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? '✅ Set' : '❌ Missing');
  
  try {
    const strategy = await generateStakeholderMotivationStrategy(req.body);
    res.json({
      strategy,
      success: true
    });
  } catch (error) {
    console.error('💥 Stakeholder Motivation server error:', error);
    res.status(500).json({
      strategy: null,
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment loaded: ${process.env.NODE_ENV || 'development'}`);
  console.log('🔗 Test endpoint: http://localhost:' + PORT + '/api/chat');
});
