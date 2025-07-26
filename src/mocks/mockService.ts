import { generateMockMissionVision, generateMockStakeholderStrategy, generateMockChatResponse } from './mockData';
import { sendChatMessage, generateMissionVision, generateStakeholderMotivationStrategy } from '../utils/api';
import type { MissionVisionInputs } from '../components/MissionVisionForm';
import type { StakeholderMotivationInputs } from '../components/StakeholderMotivationForm';

// Check if we should use real API or mock data
const useRealAPI = import.meta.env.VITE_USE_REAL_API === 'true';

// Mock Chat Service
export const mockSendChatMessage = async (request: { message: string; book?: any }) => {
  if (useRealAPI) {
    return await sendChatMessage(request);
  } else {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateMockChatResponse(request.message);
  }
};

// Mock Mission Vision Service
export const mockGenerateMissionVision = async (request: { userInputs: MissionVisionInputs }) => {
  if (useRealAPI) {
    return await generateMissionVision(request);
  } else {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return generateMockMissionVision(request.userInputs);
  }
};

// Mock Stakeholder Motivation Service
export const mockGenerateStakeholderMotivationStrategy = async (request: any) => {
  if (useRealAPI) {
    return await generateStakeholderMotivationStrategy(request);
  } else {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Convert the API request format back to our form inputs format for mock data generation
    const mockInputs: StakeholderMotivationInputs = {
      organizationChart: 'Mock Organization Chart',
      transformationScope: request.transformationContext,
      currentChallenges: request.keyChallenges,
      timeframe: request.timeline,
      resources: 'Standard resources allocated for transformation',
      additionalContext: 'Generated from API request for mock data',
      keyStakeholders: request.stakeholders.map((s: any) => ({
        name: s.name,
        role: s.role,
        department: s.department,
        influence: s.influenceLevel,
        interest: s.interestLevel,
        currentStance: s.currentStance,
        motivationFactors: s.successMotivation,
        communicationPreference: s.communicationPreference
      }))
    };
    
    return {
      strategy: generateMockStakeholderStrategy(mockInputs),
      success: true
    };
  }
};

// Mock Stream Chat Service (for future use)
export const mockStreamChatMessage = async (
  request: { message: string; book?: any },
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
) => {
  if (useRealAPI) {
    // Import the real streaming function
    const { streamChatMessage } = await import('../utils/api');
    return await streamChatMessage(request, onChunk, onComplete, onError);
  } else {
    // Simulate streaming response
    const mockResponse = generateMockChatResponse(request.message);
    const words = mockResponse.response.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      onChunk(words[i] + ' ');
    }
    
    onComplete();
  }
};

// Environment info logging
console.log(`🔧 API Mode: ${useRealAPI ? 'REAL API' : 'MOCK DATA'}`);
console.log(`📝 Environment: ${import.meta.env.MODE}`);
console.log(`🎛️ VITE_USE_REAL_API: ${import.meta.env.VITE_USE_REAL_API}`);
