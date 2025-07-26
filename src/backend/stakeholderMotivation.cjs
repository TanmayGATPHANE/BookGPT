const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Sample Chapter 3 content from "The 7Ms of Digital Transformation"
const getStakeholderMotivationContent = () => {
  return `
Chapter 3: Motivating Key Stakeholders - The SMILE Framework

The SMILE framework provides a systematic approach to stakeholder engagement:

S - SCAN: Identify and map all stakeholders
- Primary stakeholders: Direct impact/influence on transformation
- Secondary stakeholders: Indirect influence but important for success
- Key stakeholders: High influence/high interest individuals
- Shadow stakeholders: Behind-the-scenes influencers

M - MAP: Power-Interest Matrix Analysis
- High Power, High Interest: Manage Closely (Champions, Key Decision Makers)
- High Power, Low Interest: Keep Satisfied (Senior Executives, Board Members)
- Low Power, High Interest: Keep Informed (End Users, Customers)
- Low Power, Low Interest: Monitor (Peripheral teams, Vendors)

I - IDENTIFY: Motivation Factors
- WIIFM (What's In It For Me): Personal benefits and value
- Career advancement opportunities
- Reduced workload or improved efficiency
- Recognition and status enhancement
- Risk mitigation and job security

L - LEVERAGE: Engagement Strategies
- Champions: Amplify their influence, provide resources
- Supporters: Maintain engagement, recognize contributions
- Neutrals: Educate and demonstrate value
- Skeptics: Address concerns, provide evidence
- Blockers: Understand resistance, find compromise

E - EXECUTE: Communication & Action Plans
- Tailored messaging for each stakeholder group
- Regular touchpoints and feedback loops
- Quick wins to build momentum
- Escalation paths for resistance
- Success metrics and tracking

Key Principles:
- Stakeholder motivation is dynamic - regular reassessment needed
- One-size-fits-all approaches fail
- Early engagement prevents later resistance
- Transparency builds trust
- Demonstrable value overcomes skepticism

Common Stakeholder Personas:
1. The Digital Champion: Early adopter, influences others
2. The Skeptical Expert: Technical knowledge, needs convincing
3. The Busy Executive: Time-poor, needs clear ROI
4. The Change-Resistant Veteran: Experience-rich, fears disruption
5. The Ambitious Up-and-Comer: Career-focused, seeks opportunities

Communication Strategies:
- Executive Summary: High-level benefits and ROI
- Technical Deep-Dive: Detailed implementation approach
- Impact Analysis: How it affects day-to-day work
- Success Stories: Case studies and proof points
- Progress Updates: Regular milestone communication
`;
};

const generateStakeholderMotivationPrompt = (inputs) => {
  const bookContent = getStakeholderMotivationContent();
  
  return `
You are an expert digital transformation consultant specializing in stakeholder engagement. Using the SMILE framework from "The 7Ms of Digital Transformation" Chapter 3, analyze the stakeholder information and create a comprehensive motivation strategy.

BOOK CONTEXT:
${bookContent}

STAKEHOLDER INPUTS:
Transformation Context: ${inputs.transformationContext}
Success Definition: ${inputs.successDefinition}
Key Challenges: ${inputs.keyChallenges}
Timeline: ${inputs.timeline}

STAKEHOLDERS:
${inputs.stakeholders.map((s, i) => `
${i + 1}. ${s.name} (${s.role})
   - Department: ${s.department}
   - Influence Level: ${s.influenceLevel}
   - Interest Level: ${s.interestLevel}
   - Current Stance: ${s.currentStance}
   - Key Concerns: ${s.keyConcerns}
   - Communication Preference: ${s.communicationPreference}
   - Success Motivation: ${s.successMotivation}
`).join('')}

TASK:
Create a comprehensive stakeholder motivation strategy using the SMILE framework. Provide:

1. STAKEHOLDER MAPPINGS: For each stakeholder, determine:
   - Power-Interest quadrant placement
   - Specific motivation strategy
   - Tailored communication plan
   - Engagement frequency
   - Key messages that resonate
   - Success metrics for engagement

2. OVERALL STRATEGY: High-level approach considering:
   - Stakeholder interdependencies
   - Sequencing of engagement
   - Resource allocation
   - Risk mitigation

3. COMMUNICATION TIMELINE: Phase-based plan with:
   - Pre-launch preparation
   - Launch phase activities
   - Implementation milestones
   - Post-implementation follow-up

4. RISK MITIGATION: Identify and address:
   - Potential resistance points
   - Communication gaps
   - Power dynamics
   - Change fatigue

5. TRACKING METRICS: Define measurable indicators for:
   - Stakeholder engagement levels
   - Support/resistance trends
   - Communication effectiveness
   - Overall momentum

FORMAT AS JSON:
{
  "stakeholderMappings": [
    {
      "name": "string",
      "role": "string",
      "quadrant": "Manage Closely|Keep Satisfied|Keep Informed|Monitor",
      "influenceLevel": "High|Medium|Low",
      "interestLevel": "High|Medium|Low",
      "currentStance": "detailed stance description",
      "motivationStrategy": "specific strategy based on WIIFM",
      "communicationPlan": "tailored approach and messaging",
      "engagementFrequency": "specific frequency",
      "keyMessages": ["message1", "message2", "message3"],
      "successMetrics": ["metric1", "metric2"]
    }
  ],
  "overallStrategy": "comprehensive strategy description",
  "communicationTimeline": [
    {
      "phase": "phase name",
      "timeframe": "duration",
      "activities": ["activity1", "activity2"],
      "stakeholders": ["stakeholder1", "stakeholder2"]
    }
  ],
  "riskMitigation": [
    {
      "risk": "specific risk description",
      "probability": "High|Medium|Low",
      "impact": "High|Medium|Low",
      "mitigation": "mitigation strategy"
    }
  ],
  "trackingMetrics": [
    {
      "metric": "metric name",
      "frequency": "measurement frequency",
      "target": "target value/outcome",
      "measurement": "how to measure"
    }
  ]
}

Apply the SMILE framework systematically and ensure strategies are practical, actionable, and grounded in the transformation context provided.
`;
};

async function generateStakeholderMotivationStrategy(inputs) {
  try {
    console.log('Generating stakeholder motivation strategy with inputs:', JSON.stringify(inputs, null, 2));
    
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('Google API key not found');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = generateStakeholderMotivationPrompt(inputs);
    
    console.log('Generated prompt length:', prompt.length);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw AI response:', text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    const strategy = JSON.parse(jsonMatch[0]);
    
    // Validate required structure
    if (!strategy.stakeholderMappings || !Array.isArray(strategy.stakeholderMappings)) {
      throw new Error('Invalid strategy structure: missing stakeholderMappings');
    }
    
    console.log('Successfully generated strategy for', strategy.stakeholderMappings.length, 'stakeholders');
    
    return strategy;
    
  } catch (error) {
    console.error('Error generating stakeholder motivation strategy:', error);
    
    // Fallback strategy
    return {
      stakeholderMappings: inputs.stakeholders.map(stakeholder => ({
        name: stakeholder.name,
        role: stakeholder.role,
        quadrant: getQuadrantFromLevels(stakeholder.influenceLevel, stakeholder.interestLevel),
        influenceLevel: stakeholder.influenceLevel,
        interestLevel: stakeholder.interestLevel,
        currentStance: stakeholder.currentStance || 'Neutral - requires engagement',
        motivationStrategy: `Focus on ${stakeholder.successMotivation} and address concerns about ${stakeholder.keyConcerns}`,
        communicationPlan: `Use ${stakeholder.communicationPreference} for regular updates and feedback`,
        engagementFrequency: getEngagementFrequency(stakeholder.influenceLevel, stakeholder.interestLevel),
        keyMessages: [
          `Personal benefits: ${stakeholder.successMotivation}`,
          'Transformation progress and milestones',
          'Role in ensuring success'
        ],
        successMetrics: [
          'Participation in transformation activities',
          'Positive feedback and support'
        ]
      })),
      overallStrategy: 'Implement SMILE framework with focus on early wins, transparent communication, and addressing individual WIIFM factors for each stakeholder group.',
      communicationTimeline: [
        {
          phase: 'Pre-Launch Preparation',
          timeframe: '2-4 weeks before launch',
          activities: ['Stakeholder mapping validation', 'Key message development', 'Champion identification'],
          stakeholders: inputs.stakeholders.filter(s => s.influenceLevel === 'High').map(s => s.name)
        },
        {
          phase: 'Launch Phase',
          timeframe: 'Week 1-4',
          activities: ['Kick-off communications', 'Initial training', 'Quick wins demonstration'],
          stakeholders: inputs.stakeholders.map(s => s.name)
        },
        {
          phase: 'Implementation',
          timeframe: 'Month 2-6',
          activities: ['Regular progress updates', 'Issue resolution', 'Success story sharing'],
          stakeholders: inputs.stakeholders.map(s => s.name)
        }
      ],
      riskMitigation: [
        {
          risk: 'Key stakeholder resistance',
          probability: 'Medium',
          impact: 'High',
          mitigation: 'Early engagement, address concerns directly, provide additional support'
        },
        {
          risk: 'Communication overload',
          probability: 'Medium',
          impact: 'Medium',
          mitigation: 'Tailor frequency and format to stakeholder preferences'
        }
      ],
      trackingMetrics: [
        {
          metric: 'Stakeholder Engagement Score',
          frequency: 'Weekly',
          target: '>80% positive engagement',
          measurement: 'Survey responses and participation rates'
        },
        {
          metric: 'Communication Effectiveness',
          frequency: 'Bi-weekly',
          target: '>90% message clarity',
          measurement: 'Feedback surveys and comprehension checks'
        }
      ]
    };
  }
}

function getQuadrantFromLevels(influence, interest) {
  if (influence === 'High' && interest === 'High') return 'Manage Closely';
  if (influence === 'High' && interest === 'Low') return 'Keep Satisfied';
  if (influence === 'Low' && interest === 'High') return 'Keep Informed';
  return 'Monitor';
}

function getEngagementFrequency(influence, interest) {
  if (influence === 'High' && interest === 'High') return 'Weekly';
  if (influence === 'High' || interest === 'High') return 'Bi-weekly';
  return 'Monthly';
}

module.exports = {
  generateStakeholderMotivationStrategy
};
