# Backend Integration Setup

This guide explains how to integrate the Digital 7Ms frontend with a backend API to handle user questions.

## Frontend Integration Complete ✅

The frontend has been updated to:
- Make real API calls to `/api/chat` endpoint
- Send book context with user questions
- Handle loading states and errors
- Use a centralized API utility for consistent error handling

## Backend Setup Options

### Option 1: Next.js API Routes (Recommended for React projects)

1. Create `pages/api/chat.ts` (or `app/api/chat/route.ts` for App Router):

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { chatHandler } from '../../src/backend/chat';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return chatHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

### Option 2: Express.js Server

1. Install dependencies:
```bash
npm install express cors dotenv
npm install -D @types/express @types/cors
```

2. Create `server.js`:
```javascript
const express = require('express');
const cors = require('cors');
const { chatHandler } = require('./src/backend/chat');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', chatHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Option 3: Vite Proxy (for development)

Add to `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

## AI Integration

### OpenAI Integration

1. Install OpenAI SDK:
```bash
npm install openai
```

2. Add to your environment variables:
```env
OPENAI_API_KEY=your_api_key_here
```

3. Update the backend handler:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In chatHandler function:
const systemPrompt = book 
  ? `You are a helpful assistant that analyzes books. The user is asking about "${book.title}" by ${book.author}. Provide insightful, detailed analysis based on the book's content, themes, characters, and literary techniques.`
  : `You are a helpful assistant that discusses books and literature.`;

const completion = await openai.chat.completions.create({
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: message }
  ],
  model: "gpt-3.5-turbo",
  max_tokens: 500,
  temperature: 0.7,
});

const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
```

### Other AI Services

- **Claude (Anthropic)**: Use `@anthropic-ai/sdk`
- **Gemini (Google)**: Use `@google/generative-ai`
- **Local Models**: Use Ollama, LM Studio, or similar

## API Endpoint Structure

### Request Format
```json
{
  "message": "What are the main themes in this book?",
  "book": {
    "id": "1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}
```

### Response Format
```json
{
  "response": "The main themes in The Great Gatsby include...",
  "success": true
}
```

### Error Response
```json
{
  "response": "I'm sorry, I encountered an error...",
  "success": false,
  "error": "Error message"
}
```

## Development Workflow

1. **Start Frontend**: `npm run dev`
2. **Start Backend**: `npm run server` (or your backend command)
3. **Test Integration**: Select a book and ask questions

## Production Deployment

### Frontend
- Deploy to Vercel, Netlify, or similar
- Ensure API endpoints are properly configured

### Backend
- Deploy to Heroku, Railway, AWS, or similar
- Set environment variables for API keys
- Configure CORS for your frontend domain

## Streaming Support (Optional)

For real-time responses, the API utility includes streaming support:

```typescript
import { streamChatMessage } from './utils/api';

streamChatMessage(
  { message, book },
  (chunk) => {
    // Handle each chunk of the response
    setStreamingResponse(prev => prev + chunk);
  },
  () => {
    // Handle completion
    setIsLoading(false);
  },
  (error) => {
    // Handle errors
    console.error('Streaming error:', error);
  }
);
```

## Security Considerations

- Validate all inputs on the backend
- Rate limit API calls
- Sanitize user messages
- Use environment variables for API keys
- Implement proper error handling
- Consider authentication for production use

## Next Steps

1. Choose your backend setup (Next.js API routes recommended)
2. Set up your preferred AI service
3. Test the integration
4. Add authentication if needed
5. Deploy to production

The frontend is now ready to work with any backend that follows the expected API structure!
