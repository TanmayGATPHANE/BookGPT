# BookGPT - Enhanced with Digital Transformation Workflows

## 🚀 New Features Added

### Module 1: Mission & Vision Creation Workflow

The application now includes a structured workflow system specifically designed for "The 7Ms of Digital Transformation" book. This implements the Retrieval-Augmented Generation (RAG) approach where the book's content serves as the grounding knowledge for AI-generated responses.

#### Key Features:

1. **Workflow Mode Toggle**: 
   - When "The 7Ms of Digital Transformation" book is selected, users can switch between "Chat Mode" and "Workflow Mode"
   - Toggle appears in the top header of the application

2. **Mission & Vision Creation Module**:
   - Structured input form based on Chapter 2 templates from the book
   - Collects user inputs: Current scenario, Industry, Market segment, Goals, Intended TO-BE state
   - Generates 3 different mission/vision statement options with different approaches:
     - Digital-First Approach
     - Customer-Centric Approach  
     - Transformation-Focused Approach
   - Interactive selection and revision request functionality

3. **RAG Implementation**:
   - Book content service extracts relevant content from Chapter 2
   - AI prompts are enhanced with book-specific context and templates
   - Responses are grounded in the methodology from "The 7Ms of Digital Transformation"

#### Technical Implementation:

- **Frontend Components**:
  - `WorkflowContainer.tsx`: Main workflow orchestrator
  - `WorkflowSelector.tsx`: Module selection interface
  - `MissionVisionForm.tsx`: Input collection form
  - `MissionVisionResults.tsx`: Results display and interaction
  - `BookContentService.ts`: RAG content management

- **Backend Enhancement**:
  - New endpoint: `POST /api/mission-vision`
  - Enhanced AI prompts with book context
  - Structured response generation with fallback mechanisms

#### How to Use:

1. **Select the 7Ms Book**: Choose "The 7Ms of Digital Transformation" from the sidebar
2. **Switch to Workflow Mode**: Click the "Workflow Mode" toggle in the top header
3. **Choose Module**: Select "Mission & Vision Creation" from the available modules
4. **Fill the Form**: Provide your organization's details and transformation goals
5. **Review Options**: Examine the 3 generated mission/vision statement options
6. **Select & Refine**: Choose your preferred option or request revisions

#### API Endpoints:

- `POST /api/chat` - Original chat functionality
- `POST /api/mission-vision` - New mission/vision generation endpoint

#### Future Modules:

The workflow system is designed to be extensible. Planned modules include:
- Digital Strategy Framework
- Transformation Roadmap
- Metrics & Measurement

## 🔧 Development Setup

1. **Start Frontend**: `npm run dev` (runs on http://localhost:3001)
2. **Start Backend**: `node server.cjs` (runs on http://localhost:3004)
3. **Environment**: Ensure GEMINI_API_KEY and OPENAI_API_KEY are set in .env file

## 📋 Technical Notes

- The application maintains backward compatibility with existing chat functionality
- RAG implementation uses book content as context for more accurate, methodology-based responses
- Workflow mode is only available for "The 7Ms of Digital Transformation" book
- AI responses include structured approaches with rationales for each mission/vision option

This enhancement transforms the simple chat interface into a comprehensive digital transformation toolkit, making the book's methodology actionable through guided workflows.
