interface Book {
  id: string;
  title: string;
  author: string;
}

interface ChatRequest {
  message: string;
  book?: Book;
}

interface ChatResponse {
  response: string;
  success: boolean;
  error?: string;
}

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await fetch('http://localhost:3004/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      response: data.response,
      success: true,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      response: "I'm sorry, I encountered an error while processing your request. Please try again.",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const streamChatMessage = async (
  request: ChatRequest,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3004/api/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No reader available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      
      // Process complete lines
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            onComplete();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.chunk) {
              onChunk(parsed.chunk);
            }
          } catch (e) {
            // Skip malformed JSON
          }
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Unknown error');
  }
};

// Mission/Vision specific API
interface MissionVisionRequest {
  userInputs: {
    currentScenario: string;
    industry: string;
    marketSegment: string;
    intendedToBe: string;
    goal: string;
    additionalContext: string;
  };
}

interface MissionVisionResponse {
  options: MissionVisionOption[];
  success: boolean;
  error?: string;
}

// Type alias for consistency
type MissionVisionOption = {
  id: string;
  approach: string;
  mission: string;
  vision: string;
  rationale: string;
};

// Stakeholder Motivation Types
interface StakeholderInput {
  name: string;
  role: string;
  department: string;
  influenceLevel: 'High' | 'Medium' | 'Low';
  interestLevel: 'High' | 'Medium' | 'Low';
  currentStance: string;
  keyConcerns: string;
  communicationPreference: string;
  successMotivation: string;
}

interface StakeholderMotivationRequest {
  transformationContext: string;
  successDefinition: string;
  keyChallenges: string;
  timeline: string;
  stakeholders: StakeholderInput[];
}

interface StakeholderMotivationResponse {
  strategy: any; // SMILEFrameworkOutput type from results component
  success: boolean;
  error?: string;
}

interface RevisionRequest {
  type: 'mission-vision' | 'stakeholder-motivation';
  feedback: string;
  originalData: any; // Original inputs that generated the content
  currentResults: any; // Current results to be revised
}

interface RevisionResponse {
  options?: MissionVisionOption[]; // For mission-vision revisions
  strategy?: any; // For stakeholder-motivation revisions
  success: boolean;
  error?: string;
}

export const generateMissionVision = async (request: MissionVisionRequest): Promise<MissionVisionResponse> => {
  try {
    const response = await fetch('http://localhost:3004/api/mission-vision', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      options: data.options || [],
      success: true,
    };
  } catch (error) {
    console.error('Mission/Vision API Error:', error);
    return {
      options: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const generateStakeholderMotivationStrategy = async (request: StakeholderMotivationRequest): Promise<StakeholderMotivationResponse> => {
  try {
    const response = await fetch('http://localhost:3004/api/stakeholder-motivation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      strategy: data.strategy,
      success: true,
    };
  } catch (error) {
    console.error('Stakeholder Motivation API Error:', error);
    return {
      strategy: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const requestRevision = async (request: RevisionRequest): Promise<RevisionResponse> => {
  try {
    const endpoint = request.type === 'mission-vision' 
      ? 'http://localhost:3004/api/mission-vision/revise'
      : 'http://localhost:3004/api/stakeholder-motivation/revise';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (request.type === 'mission-vision') {
      return {
        options: data.options || [],
        success: true,
      };
    } else {
      return {
        strategy: data.strategy,
        success: true,
      };
    }
  } catch (error) {
    console.error('Revision API Error:', error);
    return {
      options: request.type === 'mission-vision' ? [] : undefined,
      strategy: request.type === 'stakeholder-motivation' ? null : undefined,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
