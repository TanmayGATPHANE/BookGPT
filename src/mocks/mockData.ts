import type { MissionVisionInputs } from '../components/MissionVisionForm';
import type { StakeholderMotivationInputs } from '../components/StakeholderMotivationForm';
import type { SMILEFrameworkOutput } from '../components/StakeholderMotivationResults';

// Mission Vision Mock Data
export const generateMockMissionVision = (inputs: MissionVisionInputs) => {
  return {
    options: [
      {
        id: 'mock-option-1',
        approach: 'Innovation-Driven',
        mission: `To revolutionize the ${inputs.industry.toLowerCase()} industry by ${inputs.goal.toLowerCase()}, leveraging cutting-edge digital technologies and data-driven insights to deliver exceptional value to our stakeholders while fostering innovation and sustainable growth.`,
        vision: `To be the leading digital-first organization in ${inputs.industry.toLowerCase()}, recognized for transforming ${inputs.marketSegment || 'our market'} through innovative solutions and exceptional customer experiences by 2030.`,
        rationale: 'This approach emphasizes digital leadership and innovation, positioning your organization as a technology pioneer while maintaining focus on stakeholder value and long-term sustainability.'
      },
      {
        id: 'mock-option-2',
        approach: 'Customer-Centric',
        mission: `We exist to transform the ${inputs.industry.toLowerCase()} experience by ${inputs.goal.toLowerCase()}, using digital transformation to create meaningful connections and deliver personalized solutions that exceed customer expectations.`,
        vision: `By 2030, we will be the most customer-centric ${inputs.industry.toLowerCase()} organization, setting new standards for digital innovation and customer satisfaction globally.`,
        rationale: 'This customer-focused approach prioritizes experience and relationship building, using digital transformation as a means to better serve and connect with your target audience.'
      },
      {
        id: 'mock-option-3',
        approach: 'Adaptive Excellence',
        mission: `To transform our organization and the ${inputs.industry.toLowerCase()} industry by ${inputs.goal.toLowerCase()}, building adaptive capabilities and empowering our people to thrive in an ever-evolving digital landscape.`,
        vision: `To become a resilient, digitally-enabled organization that continuously evolves and sets benchmarks for transformation excellence in ${inputs.industry.toLowerCase()}.`,
        rationale: 'This mission and vision focus on organizational agility and capability building, emphasizing adaptability, employee empowerment, and continuous evolution in response to market changes.'
      }
    ],
    success: true
  };
};

// Stakeholder Motivation Mock Data
export const generateMockStakeholderStrategy = (inputs: StakeholderMotivationInputs): SMILEFrameworkOutput => {
  return {
    // Stakeholder Mappings
    stakeholderMappings: inputs.keyStakeholders.map(stakeholder => ({
      name: stakeholder.name,
      role: stakeholder.role,
      quadrant: stakeholder.influence === 'High' && stakeholder.interest === 'High' 
        ? 'Manage Closely' 
        : stakeholder.influence === 'High' && stakeholder.interest !== 'High'
        ? 'Keep Satisfied'
        : stakeholder.influence !== 'High' && stakeholder.interest === 'High'
        ? 'Keep Informed'
        : 'Monitor' as 'Manage Closely' | 'Keep Satisfied' | 'Keep Informed' | 'Monitor',
      influenceLevel: stakeholder.influence,
      interestLevel: stakeholder.interest,
      currentStance: stakeholder.currentStance,
      motivationStrategy: `Leverage ${stakeholder.motivationFactors} to drive engagement and alignment with transformation goals`,
      communicationPlan: `${stakeholder.communicationPreference} updates focusing on ${stakeholder.motivationFactors}`,
      engagementFrequency: stakeholder.influence === 'High' ? 'Weekly' : stakeholder.interest === 'High' ? 'Bi-weekly' : 'Monthly',
      keyMessages: [
        `Your role is critical to transformation success`,
        `Benefits include: ${stakeholder.motivationFactors}`,
        `We're addressing concerns about: ${inputs.currentChallenges}`
      ],
      successMetrics: [
        'Engagement score > 80%',
        'Active participation in meetings',
        'Positive sentiment in feedback'
      ]
    })),

    // Overall Strategy
    overallStrategy: `Based on the transformation context "${inputs.transformationScope}" with a ${inputs.timeframe} timeline, our stakeholder engagement strategy focuses on addressing current challenges: ${inputs.currentChallenges}. We will implement a phased approach prioritizing high-influence stakeholders while ensuring all stakeholders understand their role in achieving transformation success. Key focus areas include transparent communication, skill development, and aligning individual motivations with organizational objectives.`,

    // Communication Timeline
    communicationTimeline: [
      {
        phase: 'Launch Phase',
        timeframe: 'Months 1-2',
        activities: [
          'Stakeholder onboarding sessions',
          'Vision and strategy communication',
          'Initial feedback collection',
          'Quick wins identification'
        ],
        stakeholders: inputs.keyStakeholders.map(s => s.name)
      },
      {
        phase: 'Implementation Phase',
        timeframe: 'Months 3-8',
        activities: [
          'Regular progress updates',
          'Skill development workshops',
          'Milestone celebrations',
          'Challenge resolution sessions'
        ],
        stakeholders: inputs.keyStakeholders.filter(s => s.interest === 'High' || s.influence === 'High').map(s => s.name)
      },
      {
        phase: 'Optimization Phase',
        timeframe: 'Months 9-12',
        activities: [
          'Performance review sessions',
          'Success story sharing',
          'Continuous improvement planning',
          'Future roadmap discussion'
        ],
        stakeholders: inputs.keyStakeholders.map(s => s.name)
      }
    ],

    // Risk Mitigation
    riskMitigation: [
      {
        risk: 'Stakeholder resistance to change',
        probability: 'Medium' as 'High' | 'Medium' | 'Low',
        impact: 'High' as 'High' | 'Medium' | 'Low',
        mitigation: 'Implement early engagement, transparent communication, and address concerns proactively through one-on-one sessions'
      },
      {
        risk: 'Communication gaps leading to misalignment',
        probability: 'Medium' as 'High' | 'Medium' | 'Low',
        impact: 'Medium' as 'High' | 'Medium' | 'Low',
        mitigation: 'Establish multiple communication channels, regular feedback loops, and designated communication champions'
      },
      {
        risk: 'Resource constraints affecting timeline',
        probability: 'High' as 'High' | 'Medium' | 'Low',
        impact: 'Medium' as 'High' | 'Medium' | 'Low',
        mitigation: 'Develop contingency plans, prioritize critical activities, and maintain flexible resource allocation'
      },
      {
        risk: 'Skill gaps impacting implementation',
        probability: 'Medium' as 'High' | 'Medium' | 'Low',
        impact: 'High' as 'High' | 'Medium' | 'Low',
        mitigation: 'Conduct skills assessment, implement comprehensive training programs, and provide ongoing mentorship'
      }
    ],

    // Tracking Metrics
    trackingMetrics: [
      {
        metric: 'Stakeholder Engagement Score',
        frequency: 'Monthly',
        target: '85% positive engagement',
        measurement: 'Survey responses and participation tracking'
      },
      {
        metric: 'Communication Effectiveness',
        frequency: 'Bi-weekly',
        target: '90% message comprehension',
        measurement: 'Feedback surveys and knowledge checks'
      },
      {
        metric: 'Change Readiness Index',
        frequency: 'Quarterly',
        target: '80% readiness score',
        measurement: 'Comprehensive readiness assessment'
      },
      {
        metric: 'Implementation Milestone Completion',
        frequency: 'Monthly',
        target: '95% on-time completion',
        measurement: 'Project tracking and milestone reviews'
      },
      {
        metric: 'Stakeholder Satisfaction',
        frequency: 'Quarterly',
        target: '4.0/5.0 satisfaction rating',
        measurement: 'Satisfaction surveys and feedback sessions'
      }
    ]
  };
};

// Chat Mock Data
export const generateMockChatResponse = (message: string) => {
  const responses = [
    "Based on the book's insights, I suggest considering the following digital transformation approach...",
    "The author emphasizes the importance of stakeholder engagement in this context. Let me elaborate...",
    "This reminds me of Chapter 5 where the book discusses similar challenges. Here's what it recommends...",
    "According to the book's framework, your situation aligns with the principles outlined in the methodology section...",
    "The book provides a comprehensive strategy for this type of scenario. Let me break it down for you..."
  ];
  
  const randomIndex = Math.floor(Math.random() * responses.length);
  return {
    response: responses[randomIndex] + " " + message.slice(0, 100) + "...",
    success: true
  };
};
