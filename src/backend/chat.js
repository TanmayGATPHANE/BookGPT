// Backend API route for chat functionality
const dotenv = require('dotenv');
dotenv.config();

const chatHandler = async (req, res) => {
  try {
    const { message, book } = req.body;

    // Validate request
    if (!message || typeof message !== 'string') {
      res.status(400).json({
        response: "Invalid message format",
        success: false,
        error: "Message is required and must be a string"
      });
      return;
    }

    // AI/LLM Integration
    let aiResponse;
    
    const systemPrompt = book 
      ? `You are a helpful assistant that analyzes books. The user is asking about "${book.title}" by ${book.author}. Provide insightful, detailed analysis based on the book's content, themes, characters, and literary techniques. Be specific and reference key elements from the book.`
      : `You are a helpful assistant that discusses books and literature. Provide thoughtful insights about literary works, themes, and analysis.`;

    try {
      // Primary: Google Gemini Integration
      if (process.env.GEMINI_API_KEY) {
        console.log('🔍 Attempting to use Google Gemini...');
        
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const prompt = `${systemPrompt}\n\nUser Question: ${message}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponse = response.text();
        
        console.log('✅ Used Google Gemini successfully');
      } else {
        throw new Error('Gemini API key not found');
      }
    } catch (geminiError) {
      console.log('⚠️ Gemini failed:', geminiError.message);
      
      try {
        // Fallback: OpenAI Integration
        if (process.env.OPENAI_API_KEY) {
          console.log('🔍 Attempting to use OpenAI fallback...');
          
          const OpenAI = require('openai');
          
          const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });

          const completion = await openai.chat.completions.create({
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message }
            ],
            model: "gpt-4o-mini",
            max_tokens: 500,
            temperature: 0.7,
          });

          aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
          console.log('✅ Used OpenAI fallback successfully');
        } else {
          throw new Error('OpenAI API key not found');
        }
      } catch (openaiError) {
        console.log('⚠️ OpenAI also failed:', openaiError.message);
        
        // Final fallback: Mock response
        console.log('🔄 Using mock response');
        aiResponse = book 
          ? `I'd be happy to help you analyze "${book.title}" by ${book.author}. Regarding your question: "${message}" - This is a great question that touches on important themes in the book. The author explores this through various narrative techniques and character development. Would you like me to elaborate on any specific aspect?`
          : `I'd be happy to help you with your question about books and literature: "${message}". Could you please specify which book you'd like to discuss?`;
      }
    }

    const response = {
      response: aiResponse,
      success: true,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('💥 Chat API Error:', error);
    res.status(500).json({
      response: "I'm sorry, I encountered an error while processing your request. Please try again.",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { chatHandler };
