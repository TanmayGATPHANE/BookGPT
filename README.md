# 📚 Digital 7Ms - AI-Powered Book Analysis Platform

> **Intelligent Book Exploration with Google Gemini AI**

Digital 7Ms is a modern, AI-powered web application that transforms how you explore and understand books. Built with React and powered by Google Gemini AI, it provides deep literary analysis, character studies, theme exploration, and interactive discussions about your favorite books.

## 🌟 **Features**

### 🤖 **AI-Powered Analysis**
- **Google Gemini 1.5 Flash Integration** - Primary AI engine for intelligent responses
- **OpenAI GPT-3.5 Fallback** - Backup AI service for high availability
- **Context-Aware Responses** - AI understands the specific book you're discussing
- **Literary Expertise** - Specialized in book analysis, themes, and character studies

### 📖 **Book Library**
- **Curated Book Collection** - Currently features classic and modern literature
- **Visual Book Covers** - SVG-based book cover designs
- **Book Metadata** - Author, description, and thematic information
- **Easy Book Selection** - Intuitive sidebar interface

### 💬 **Interactive Chat Interface**
- **Real-Time Conversations** - Instant AI responses to your questions
- **Message History** - Persistent chat history for each session
- **Quick Action Buttons** - Pre-defined prompts for common analysis types
- **Responsive Design** - Works seamlessly across devices

### 🎨 **Modern UI/UX**
- **Beautiful Animations** - Smooth transitions and micro-interactions
- **Collapsible Sidebar** - Optimized space utilization
- **Gradient Backgrounds** - Elegant orange-themed design
- **User Authentication** - Secure sign-in system

## 🚀 **Live Demo**

The application is currently running with Google Gemini AI integration:
- **Frontend**: `http://localhost:3001`
- **Backend API**: `http://localhost:3004`
- **Status**: ✅ **Fully Operational**

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CommonJS** - Module system for compatibility

### **AI Integration**
- **Google Gemini 1.5 Flash** - Primary AI model
- **OpenAI GPT-3.5-turbo** - Fallback AI model
- **Smart Fallback System** - Automatic failover between AI services

### **Development Tools**
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **dotenv** - Environment variable management

## 📁 **Project Structure**

```
Digital 7Ms/
├── src/
│   ├── components/          # React components
│   │   ├── BookSelector.tsx # Book selection interface
│   │   ├── ChatWindow.tsx   # Chat interface
│   │   ├── MessageInput.tsx # Message input component
│   │   ├── SignIn.tsx       # Authentication component
│   │   └── UserProfile.tsx  # User profile component
│   ├── context/
│   │   └── AppContext.tsx   # Global state management
│   ├── utils/
│   │   └── api.ts          # API utility functions
│   ├── backend/
│   │   └── chat.cjs        # Backend chat handler
│   ├── styles/
│   │   ├── index.css       # Global styles
│   │   └── animations.css  # Animation definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx           # Application entry point
├── public/
│   └── images/            # Book cover images
├── server.cjs             # Express server
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## ⚡ **Quick Start**

### **Prerequisites**
- Node.js 18+ installed
- Google Gemini API key (free)
- OpenAI API key (optional, for fallback)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/TanmayGATPHANE/BookGPT.git
   cd BookGPT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3004
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   node server.cjs
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:3001`
   - Backend API: `http://localhost:3004`

## 🔧 **API Integration**

### **Primary AI Service: Google Gemini**
- **Model**: `gemini-1.5-flash`
- **Rate Limit**: 15 requests/minute (free tier)
- **Monthly Limit**: 1,500 requests
- **Cost**: Completely free

### **Fallback AI Service: OpenAI**
- **Model**: `gpt-3.5-turbo` 
- **Rate Limit**: 3 requests/minute (free tier)
- **Credits**: $5 for new accounts
- **Cost**: ~$0.002 per 1K tokens

### **API Endpoint**
```
POST /api/chat
Content-Type: application/json

{
  "message": "What are the main themes?",
  "book": {
    "id": "1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}
```

## 📖 **Available Books**

### **Classic Literature**
- **The Great Gatsby** by F. Scott Fitzgerald
- **Pride and Prejudice** by Jane Austen

### **Modern Non-Fiction**
- **The 7Ms of Digital Transformation** by Arindam Dutta

*More books can be easily added through the `AppContext.tsx` file*

## 🎯 **Usage Examples**

### **Book Analysis**
- "What are the main themes in The Great Gatsby?"
- "Analyze the character development of Jay Gatsby"
- "Explain the symbolism in Pride and Prejudice"

### **Plot Discussion**
- "Summarize the plot structure"
- "What is the climax of the story?"
- "How does the setting influence the narrative?"

### **Writing Style**
- "Analyze the author's writing style"
- "What literary techniques are used?"
- "How does the narrative perspective affect the story?"

## 🔄 **Development Status**

### **✅ Completed Features**
- [x] Google Gemini AI integration
- [x] OpenAI fallback system
- [x] Real-time chat interface
- [x] Book selection system
- [x] User authentication
- [x] Responsive design
- [x] Animation system
- [x] Error handling

### **🚧 Planned Features**
- [ ] Book upload functionality
- [ ] User library management
- [ ] Conversation export
- [ ] Multi-language support
- [ ] Mobile app version

## 🐛 **Known Issues**
- None currently reported

## 📋 **Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
node server.cjs      # Start backend server
```

## 🔒 **Environment Variables**

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (for fallback)
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3004
NODE_ENV=development
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Google Gemini** for providing free AI API access
- **OpenAI** for backup AI capabilities
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first styling approach
- **Vite** for the fast development experience

## 📞 **Support**

For support and questions:
- Create an issue on GitHub
- Email: support@Digital 7Ms.com
- Documentation: See `AI_INTEGRATION_GUIDE.md`

---

**Built with ❤️ by the Digital 7Ms Team**

*Transform your reading experience with AI-powered book analysis!*