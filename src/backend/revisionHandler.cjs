// Backend API route for handling revision requests
const dotenv = require('dotenv');
dotenv.config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const handleMissionVisionRevision = async (req, res) => {
  try {
    const { feedback, originalData, currentResults } = req.body;

    // Validate request
    if (!feedback || !originalData || !currentResults) {
      res.status(400).json({
        options: [],
        success: false,
        error: "Feedback, original data, and current results are required for revision"
      });
      return;
    }

    // Create structured prompt for revision
    const revisionPrompt = `
Based on "The 7Ms of Digital Transformation" Chapter 2, I need to revise the mission and vision statements based on user feedback.

ORIGINAL USER INPUTS:
- Current Scenario: ${originalData.currentScenario}
- Industry: ${originalData.industry}
- Market Segment: ${originalData.marketSegment}
- Intended To Be: ${originalData.intendedToBe}
- Goal: ${originalData.goal}
- Additional Context: ${originalData.additionalContext}

CURRENT RESULTS THAT NEED REVISION:
${currentResults.map((option, index) => `
Option ${index + 1}:
- Approach: ${option.approach}
- Mission: ${option.mission}
- Vision: ${option.vision}
- Rationale: ${option.rationale}
`).join('\n')}

USER FEEDBACK FOR REVISION:
${feedback}

Based on the user's feedback, please generate 3 REVISED mission and vision options that address their concerns while maintaining alignment with the digital transformation framework. Each option should have a different strategic approach.

Return ONLY a valid JSON object with this exact structure:
{
  "options": [
    {
      "id": "revised-1",
      "approach": "Strategic approach name",
      "mission": "Clear, actionable mission statement (1-2 sentences)",
      "vision": "Inspiring vision statement (1-2 sentences)",
      "rationale": "Why this revised approach addresses the feedback (2-3 sentences)"
    }
  ]
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(revisionPrompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const jsonResponse = JSON.parse(jsonMatch[0]);
      
      if (!jsonResponse.options || !Array.isArray(jsonResponse.options)) {
        throw new Error('Invalid response structure');
      }

      // Ensure each option has required fields
      const validOptions = jsonResponse.options.filter(option => 
        option.id && option.approach && option.mission && option.vision && option.rationale
      );

      if (validOptions.length === 0) {
        throw new Error('No valid options in response');
      }

      res.json({
        options: validOptions,
        success: true
      });

    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      
      // Fallback: generate basic revised options
      const fallbackOptions = [
        {
          id: "revised-fallback-1",
          approach: "Revised Customer-Centric Approach",
          mission: `To leverage digital transformation in ${originalData.industry} by ${originalData.goal.toLowerCase()}, addressing your specific concerns about ${feedback.slice(0, 50)}...`,
          vision: `To become the leading ${originalData.intendedToBe} through innovative digital solutions that ${originalData.goal.toLowerCase()}.`,
          rationale: `This revised approach specifically addresses your feedback: "${feedback.slice(0, 100)}..." while maintaining focus on digital transformation principles.`
        }
      ];

      res.json({
        options: fallbackOptions,
        success: true
      });
    }

  } catch (error) {
    console.error('Mission/Vision revision error:', error);
    res.status(500).json({
      options: [],
      success: false,
      error: "Failed to generate revised mission and vision statements"
    });
  }
};

const handleStakeholderMotivationRevision = async (req, res) => {
  try {
    const { feedback, originalData, currentResults } = req.body;

    // Validate request
    if (!feedback || !originalData || !currentResults) {
      res.status(400).json({
        strategy: null,
        success: false,
        error: "Feedback, original data, and current results are required for revision"
      });
      return;
    }

    // Create structured prompt for stakeholder strategy revision
    const revisionPrompt = `
Based on "The 7Ms of Digital Transformation" stakeholder motivation framework, I need to revise the stakeholder strategy based on user feedback.

ORIGINAL TRANSFORMATION CONTEXT:
- Transformation Context: ${originalData.transformationContext}
- Success Definition: ${originalData.successDefinition}
- Key Challenges: ${originalData.keyChallenges}
- Timeline: ${originalData.timeline}

STAKEHOLDERS:
${originalData.stakeholders.map(s => `
- ${s.name} (${s.role}, ${s.department})
  - Influence: ${s.influenceLevel}, Interest: ${s.interestLevel}
  - Current Stance: ${s.currentStance}
  - Key Concerns: ${s.keyConcerns}
  - Communication Preference: ${s.communicationPreference}
  - Success Motivation: ${s.successMotivation}
`).join('\n')}

USER FEEDBACK FOR REVISION:
${feedback}

Based on the user's feedback, please generate a REVISED comprehensive stakeholder motivation strategy that addresses their concerns. Use the SMILE framework (Stakeholder Mapping, Influence analysis, Leverage points, Engagement strategy).

Return ONLY a valid JSON object with the revised strategy structure that matches the original format but incorporates the feedback.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(revisionPrompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const jsonResponse = JSON.parse(jsonMatch[0]);
      
      res.json({
        strategy: jsonResponse,
        success: true
      });

    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      
      // Fallback: generate basic revised strategy
      const fallbackStrategy = {
        stakeholderMapping: {
          highInfluenceHighInterest: ["Revised based on feedback"],
          analysisNote: `Strategy revised based on user feedback: ${feedback.slice(0, 100)}...`
        },
        engagementStrategy: {
          overview: `Revised engagement approach addressing: ${feedback.slice(0, 150)}...`,
          keyPrinciples: ["Feedback-driven approach", "Enhanced communication", "Improved stakeholder alignment"]
        }
      };

      res.json({
        strategy: fallbackStrategy,
        success: true
      });
    }

  } catch (error) {
    console.error('Stakeholder motivation revision error:', error);
    res.status(500).json({
      strategy: null,
      success: false,
      error: "Failed to generate revised stakeholder motivation strategy"
    });
  }
};

module.exports = {
  handleMissionVisionRevision,
  handleStakeholderMotivationRevision
};
