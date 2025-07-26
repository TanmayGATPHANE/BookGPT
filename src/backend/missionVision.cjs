// Backend API route for mission/vision generation
const dotenv = require('dotenv');
dotenv.config();

const missionVisionHandler = async (req, res) => {
  try {
    const { userInputs } = req.body;

    // Validate request
    if (!userInputs || typeof userInputs !== 'object') {
      res.status(400).json({
        options: [],
        success: false,
        error: "User inputs are required"
      });
      return;
    }

    // Required fields validation
    const requiredFields = ['currentScenario', 'industry', 'goal', 'intendedToBe'];
    const missingFields = requiredFields.filter(field => !userInputs[field] || !userInputs[field].trim());
    
    if (missingFields.length > 0) {
      res.status(400).json({
        options: [],
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
      return;
    }

    // Create structured prompt with book context
    const bookContext = `
Based on "The 7Ms of Digital Transformation" Chapter 2:

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

User's Context:
- Current Scenario: ${userInputs.currentScenario}
- Industry: ${userInputs.industry}
- Market Segment: ${userInputs.marketSegment || 'Not specified'}
- Transformation Goal: ${userInputs.goal}
- Intended TO-BE: ${userInputs.intendedToBe}
- Additional Context: ${userInputs.additionalContext || 'None provided'}
    `;

    const prompt = `
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
    `;

    let aiResponse;

    try {
      // Primary: Google Gemini Integration
      if (process.env.GEMINI_API_KEY) {
        console.log('🔍 Attempting to use Google Gemini for Mission/Vision...');
        
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponse = response.text();
        
        console.log('✅ Used Google Gemini successfully for Mission/Vision');
      } else {
        throw new Error('Gemini API key not found');
      }
    } catch (geminiError) {
      console.log('⚠️ Gemini failed for Mission/Vision:', geminiError.message);
      
      try {
        // Fallback: OpenAI Integration
        if (process.env.OPENAI_API_KEY) {
          console.log('🔄 Falling back to OpenAI for Mission/Vision...');
          
          const OpenAI = require('openai');
          const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });

          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are an expert digital transformation consultant specializing in mission and vision creation." },
              { role: "user", content: prompt }
            ],
            temperature: 0.7,
          });

          aiResponse = completion.choices[0].message.content;
          console.log('✅ Used OpenAI successfully for Mission/Vision');
        } else {
          throw new Error('OpenAI API key not found');
        }
      } catch (openaiError) {
        console.log('⚠️ OpenAI also failed for Mission/Vision:', openaiError.message);
        throw new Error('Both AI services failed');
      }
    }

    // Try to parse the JSON response
    let parsedResponse;
    try {
      // Clean the response to extract JSON
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : aiResponse;
      parsedResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.log('⚠️ Failed to parse JSON, using fallback response');
      
      // Fallback response if JSON parsing fails
      parsedResponse = {
        options: [
          {
            id: "option-1",
            approach: "Digital-First Approach",
            mission: `To ${userInputs.goal.toLowerCase()} by leveraging cutting-edge digital technologies and data-driven insights, delivering exceptional value to our stakeholders in the ${userInputs.industry.toLowerCase()} industry while fostering innovation and sustainable growth.`,
            vision: `To be the leading digital-first organization in ${userInputs.industry.toLowerCase()}, recognized for transforming ${userInputs.marketSegment || 'our market'} through innovative solutions and exceptional customer experiences.`,
            rationale: "This mission and vision emphasize digital leadership and innovation, positioning your organization as a technology pioneer in your industry while maintaining focus on stakeholder value and sustainable growth."
          },
          {
            id: "option-2",
            approach: "Customer-Centric Approach", 
            mission: `We exist to revolutionize the ${userInputs.industry.toLowerCase()} experience by ${userInputs.goal.toLowerCase()}, using digital transformation to create meaningful connections and deliver personalized solutions that exceed expectations.`,
            vision: `By 2027, we will be the most customer-centric ${userInputs.industry.toLowerCase()} organization, setting new standards for digital innovation and customer satisfaction.`,
            rationale: "This approach prioritizes customer experience and relationship building, using digital transformation as a means to better serve and connect with your target audience."
          },
          {
            id: "option-3",
            approach: "Transformation-Focused Approach",
            mission: `To transform our organization and the ${userInputs.industry.toLowerCase()} industry by ${userInputs.goal.toLowerCase()}, building adaptive capabilities and empowering our people to thrive in the digital age.`,
            vision: `To become a resilient, digitally-enabled organization that continuously evolves and sets benchmarks for transformation excellence in ${userInputs.industry.toLowerCase()}.`,
            rationale: "This mission and vision focus on organizational transformation and capability building, emphasizing adaptability, employee empowerment, and continuous evolution in the digital landscape."
          }
        ]
      };
    }

    // Validate that we have the expected structure
    if (!parsedResponse.options || !Array.isArray(parsedResponse.options)) {
      throw new Error('Invalid response structure from AI');
    }

    console.log('📋 Generated Mission/Vision options successfully');
    
    res.json({
      options: parsedResponse.options,
      success: true
    });

  } catch (error) {
    console.error('💥 Mission/Vision generation error:', error);
    res.status(500).json({
      options: [],
      success: false,
      error: error.message
    });
  }
};

module.exports = { missionVisionHandler };
