// Service for handling book content and RAG functionality
// This service manages the book content and provides context for AI queries

interface BookChapter {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  templates?: any[];
}

interface BookContent {
  bookId: string;
  title: string;
  chapters: BookChapter[];
}

// Sample content from Chapter 2 of "The 7Ms of Digital Transformation"
// This would normally be extracted from PDF or stored in a database
const BOOK_CONTENT: BookContent = {
  bookId: "7ms-digital-transformation",
  title: "The 7Ms of Digital Transformation",
  chapters: [
    {
      id: "chapter-2",
      title: "Mission and Vision in Digital Transformation",
      content: `
        Mission and Vision statements are foundational elements that guide any successful digital transformation initiative. 
        They provide direction, purpose, and alignment across the organization.

        A Mission Statement defines the organization's purpose - why it exists and what it aims to achieve. 
        In the context of digital transformation, the mission should reflect how technology and digital capabilities 
        will enable the organization to fulfill its core purpose more effectively.

        A Vision Statement describes the desired future state - what the organization aspires to become. 
        For digital transformation, the vision should paint a clear picture of how the organization will operate, 
        compete, and create value in the digital age.

        Key Elements for Mission Statement:
        - Clear purpose and reason for existence
        - How digital capabilities enhance core business
        - Value proposition to stakeholders
        - Cultural values and principles

        Key Elements for Vision Statement:
        - Future state after transformation
        - Digital capabilities and competitive advantages
        - Market position and customer experience
        - Organizational culture and capabilities

        The mission and vision must be:
        - Aligned with business strategy
        - Inspiring and motivational
        - Clear and understandable
        - Achievable yet ambitious
        - Measurable and specific
      `,
      keyPoints: [
        "Mission defines purpose, Vision defines future state",
        "Must align with overall business strategy",
        "Should reflect digital capabilities and advantages",
        "Need to be inspiring yet achievable",
        "Should guide decision-making throughout transformation",
        "Must consider stakeholder value and organizational culture"
      ],
      templates: [
        {
          type: "mission_template",
          structure: "We exist to [purpose] by [how] for [stakeholders] through [digital capabilities]",
          example: "We exist to transform healthcare delivery by leveraging AI and data analytics for better patient outcomes through integrated digital platforms"
        },
        {
          type: "vision_template", 
          structure: "By [timeframe], we will be [future state] recognized for [differentiation] enabling [value creation]",
          example: "By 2027, we will be the leading digital-first healthcare provider recognized for personalized patient care enabling improved health outcomes and reduced costs"
        }
      ]
    }
  ]
};

export class BookContentService {
  private static instance: BookContentService;
  private bookContent: BookContent;

  private constructor() {
    this.bookContent = BOOK_CONTENT;
  }

  public static getInstance(): BookContentService {
    if (!BookContentService.instance) {
      BookContentService.instance = new BookContentService();
    }
    return BookContentService.instance;
  }

  // Get relevant content for mission/vision creation
  public getMissionVisionContent(): BookChapter | null {
    return this.bookContent.chapters.find(chapter => chapter.id === "chapter-2") || null;
  }

  // Get context for RAG-based AI queries
  public getContextForMissionVision(userInputs: any): string {
    const chapter = this.getMissionVisionContent();
    if (!chapter) return "";

    return `
Based on "The 7Ms of Digital Transformation" Chapter 2:

${chapter.content}

Key Principles:
${chapter.keyPoints.map(point => `- ${point}`).join('\n')}

Templates Available:
${chapter.templates?.map(template => 
  `${template.type}: ${template.structure}\nExample: ${template.example}`
).join('\n\n')}

User's Context:
- Current Scenario: ${userInputs.currentScenario}
- Industry: ${userInputs.industry}
- Market Segment: ${userInputs.marketSegment || 'Not specified'}
- Transformation Goal: ${userInputs.goal}
- Intended TO-BE: ${userInputs.intendedToBe}
- Additional Context: ${userInputs.additionalContext || 'None provided'}
    `.trim();
  }

  // Generate AI prompt for mission/vision creation
  public generateMissionVisionPrompt(userInputs: any): string {
    const bookContext = this.getContextForMissionVision(userInputs);
    
    return `
You are an expert digital transformation consultant specializing in mission and vision creation based on "The 7Ms of Digital Transformation" methodology.

${bookContext}

Task: Create 3 different sets of Mission and Vision statements for this organization, each with a slightly different approach:

1. **Digital-First Approach**: Emphasizing technology and innovation leadership
2. **Customer-Centric Approach**: Focusing on enhanced customer experience and value
3. **Transformation-Focused Approach**: Highlighting organizational change and capability building

For each set, provide:
- A clear, compelling Mission Statement (2-3 sentences)
- An inspiring Vision Statement (1-2 sentences) 
- Brief rationale explaining why this approach fits the organization's context

Requirements:
- Follow the templates and principles from the book
- Ensure alignment between mission and vision
- Make them specific to the user's industry and context
- Include digital transformation elements
- Keep language clear and motivational
- Consider the organization's current state and desired future

Format your response as JSON:
{
  "options": [
    {
      "id": "option-1",
      "approach": "Digital-First Approach",
      "mission": "...",
      "vision": "...",
      "rationale": "..."
    },
    {
      "id": "option-2", 
      "approach": "Customer-Centric Approach",
      "mission": "...",
      "vision": "...",
      "rationale": "..."
    },
    {
      "id": "option-3",
      "approach": "Transformation-Focused Approach", 
      "mission": "...",
      "vision": "...",
      "rationale": "..."
    }
  ]
}
    `.trim();
  }

  // Get all available chapters (for future modules)
  public getAllChapters(): BookChapter[] {
    return this.bookContent.chapters;
  }

  // Add new content (for when PDF extraction is implemented)
  public addChapterContent(chapter: BookChapter): void {
    const existingIndex = this.bookContent.chapters.findIndex(c => c.id === chapter.id);
    if (existingIndex >= 0) {
      this.bookContent.chapters[existingIndex] = chapter;
    } else {
      this.bookContent.chapters.push(chapter);
    }
  }
}

export type { BookChapter, BookContent };
