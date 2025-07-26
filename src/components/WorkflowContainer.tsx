import { useState } from 'react';
import { WorkflowSelector } from './WorkflowSelector';
import { MissionVisionForm, type MissionVisionInputs } from './MissionVisionForm';
import { MissionVisionResults, type MissionVisionOption } from './MissionVisionResults';
import { StakeholderMotivationForm, type StakeholderMotivationInputs } from './StakeholderMotivationForm';
import { StakeholderMotivationResults, type SMILEFrameworkOutput } from './StakeholderMotivationResults';
import { mockGenerateMissionVision, mockGenerateStakeholderMotivationStrategy, mockSendChatMessage } from '../mocks/mockService';
import { BookContentService } from '../utils/bookContentService';

type WorkflowStep = 'selector' | 'mission-vision-form' | 'mission-vision-results' | 'stakeholder-motivation-form' | 'stakeholder-motivation-results';

interface WorkflowContainerProps {
  // Props can be added here if needed in the future
}

export function WorkflowContainer({}: WorkflowContainerProps = {}) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('selector');
  const [isLoading, setIsLoading] = useState(false);
  const [missionVisionOptions, setMissionVisionOptions] = useState<MissionVisionOption[]>([]);
  const [stakeholderStrategy, setStakeholderStrategy] = useState<SMILEFrameworkOutput | null>(null);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleModuleSelect = (moduleId: string) => {
    if (moduleId === 'mission-vision') {
      setCurrentStep('mission-vision-form');
    } else if (moduleId === 'stakeholder-motivation') {
      setCurrentStep('stakeholder-motivation-form');
    }
    // Add other modules here as they become available
  };

  const handleMissionVisionSubmit = async (inputs: MissionVisionInputs) => {
    setIsLoading(true);
    
    try {
      // Generate mission/vision using RAG approach
      const bookService = BookContentService.getInstance();
      // Get structured prompt with book context for the AI
      bookService.generateMissionVisionPrompt(inputs);
      
      // Send request to API or mock service
      const response = await mockGenerateMissionVision({ userInputs: inputs });
      
      if (response.success && response.options.length > 0) {
        // Transform the response to match our MissionVisionOption interface
        const transformedOptions: MissionVisionOption[] = response.options.map(option => ({
          id: option.id,
          mission: option.mission,
          vision: option.vision,
          rationale: `${option.approach}: ${option.rationale}`
        }));
        
        setMissionVisionOptions(transformedOptions);
        setCurrentStep('mission-vision-results');
      } else {
        // Fallback to mock data if API fails
        const mockOptions: MissionVisionOption[] = [
          {
            id: 'option-1',
            mission: `To ${inputs.goal.toLowerCase()} by leveraging cutting-edge digital technologies and data-driven insights, delivering exceptional value to our stakeholders in the ${inputs.industry.toLowerCase()} industry while fostering innovation and sustainable growth.`,
            vision: `To be the leading digital-first organization in ${inputs.industry.toLowerCase()}, recognized for transforming ${inputs.marketSegment || 'our market'} through innovative solutions and exceptional customer experiences.`,
            rationale: 'This mission and vision emphasize digital leadership and innovation, positioning your organization as a technology pioneer in your industry while maintaining focus on stakeholder value and sustainable growth.'
          },
          {
            id: 'option-2', 
            mission: `We exist to revolutionize the ${inputs.industry.toLowerCase()} experience by ${inputs.goal.toLowerCase()}, using digital transformation to create meaningful connections and deliver personalized solutions that exceed expectations.`,
            vision: `By 2027, we will be the most customer-centric ${inputs.industry.toLowerCase()} organization, setting new standards for digital innovation and customer satisfaction.`,
            rationale: 'This approach prioritizes customer experience and relationship building, using digital transformation as a means to better serve and connect with your target audience.'
          },
          {
            id: 'option-3',
            mission: `To transform our organization and the ${inputs.industry.toLowerCase()} industry by ${inputs.goal.toLowerCase()}, building adaptive capabilities and empowering our people to thrive in the digital age.`,
            vision: `To become a resilient, digitally-enabled organization that continuously evolves and sets benchmarks for transformation excellence in ${inputs.industry.toLowerCase()}.`,
            rationale: 'This mission and vision focus on organizational transformation and capability building, emphasizing adaptability, employee empowerment, and continuous evolution in the digital landscape.'
          }
        ];
        
        setMissionVisionOptions(mockOptions);
        setCurrentStep('mission-vision-results');
      }
    } catch (error) {
      console.error('Error generating mission/vision:', error);
      // Show error state or fallback options
      setMissionVisionOptions([]);
      setCurrentStep('mission-vision-results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: MissionVisionOption) => {
    // Here you could save the selected option or proceed to next step
    console.log('Selected option:', option);
  };

  const handleRevisionRequest = async (feedback: string) => {
    setIsLoading(true);
    
    // In a real implementation, you would send the feedback to the API
    // to generate revised options
    console.log('Revision requested:', feedback);
    
    // For now, just show the loading state and then current options
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleStakeholderMotivationSubmit = async (inputs: StakeholderMotivationInputs) => {
    setIsLoading(true);
    
    try {
      // Map the form inputs to the API request format
      const apiRequest = {
        transformationContext: inputs.transformationScope,
        successDefinition: inputs.transformationScope, // Could be more specific
        keyChallenges: inputs.currentChallenges,
        timeline: inputs.timeframe,
        stakeholders: inputs.keyStakeholders.map(stakeholder => ({
          name: stakeholder.name,
          role: stakeholder.role,
          department: stakeholder.department,
          influenceLevel: stakeholder.influence,
          interestLevel: stakeholder.interest,
          currentStance: stakeholder.currentStance,
          keyConcerns: stakeholder.motivationFactors, // Using motivationFactors as concerns
          communicationPreference: stakeholder.communicationPreference,
          successMotivation: stakeholder.motivationFactors
        }))
      };
      
      const response = await mockGenerateStakeholderMotivationStrategy(apiRequest);
      
      if (response.success && response.strategy) {
        setStakeholderStrategy(response.strategy);
        setCurrentStep('stakeholder-motivation-results');
      } else {
        console.error('Failed to generate stakeholder strategy:', response.error);
        // Show error state or use fallback
        setCurrentStep('stakeholder-motivation-results');
      }
    } catch (error) {
      console.error('Error generating stakeholder strategy:', error);
      setCurrentStep('stakeholder-motivation-results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStakeholderRevisionRequest = async (feedback: string) => {
    setIsLoading(true);
    console.log('Stakeholder strategy revision requested:', feedback);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleStakeholderExport = () => {
    console.log('Exporting stakeholder strategy:', stakeholderStrategy);
    // Implement export functionality
  };

  const handleStakeholderFinalize = () => {
    console.log('Stakeholder strategy finalized');
    // Could proceed to next module or show completion
  };

  const handleNextModule = () => {
    // Determine which module to go to next
    if (currentStep === 'mission-vision-results') {
      setCurrentStep('stakeholder-motivation-form');
    } else if (currentStep === 'stakeholder-motivation-results') {
      // Would proceed to Module 3 when implemented
      console.log('Proceeding to Module 3: Methods & Processes');
      // For now, go back to selector
      setCurrentStep('selector');
    }
  };

  const handleContinueTalk = () => {
    // Show chat interface below the current results
    setShowChatInterface(true);
  };

  const handleChatSubmit = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      // Send message to mock chat service
      const response = await mockSendChatMessage({ message });
      
      if (response.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleBackToSelector = () => {
    setCurrentStep('selector');
    setMissionVisionOptions([]);
    setStakeholderStrategy(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
      {/* Navigation breadcrumb */}
      {currentStep !== 'selector' && (
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={handleBackToSelector}
              className="text-orange-600 hover:text-orange-800 hover:underline"
            >
              Workflow Modules
            </button>
            {(currentStep === 'mission-vision-results' || currentStep === 'stakeholder-motivation-results') && (
              <>
                <span className="text-gray-400">/</span>
                <button
                  onClick={() => setCurrentStep(currentStep.includes('mission-vision') ? 'mission-vision-form' : 'stakeholder-motivation-form')}
                  className="text-orange-600 hover:text-orange-800 hover:underline"
                >
                  {currentStep.includes('mission-vision') ? 'Mission & Vision Form' : 'Stakeholder Motivation Form'}
                </button>
              </>
            )}
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">
              {currentStep === 'mission-vision-form' && 'Input Collection'}
              {currentStep === 'mission-vision-results' && 'Generated Options'}
              {currentStep === 'stakeholder-motivation-form' && 'Stakeholder Analysis'}
              {currentStep === 'stakeholder-motivation-results' && 'SMILE Strategy'}
            </span>
          </nav>
        </div>
      )}

      {/* Main content */}
      {currentStep === 'selector' && (
        <WorkflowSelector onModuleSelect={handleModuleSelect} />
      )}

      {currentStep === 'mission-vision-form' && (
        <MissionVisionForm 
          onSubmit={handleMissionVisionSubmit}
          isLoading={isLoading}
        />
      )}

      {currentStep === 'mission-vision-results' && (
        <MissionVisionResults
          options={missionVisionOptions}
          onSelectOption={handleOptionSelect}
          onRequestRevision={handleRevisionRequest}
          onNextModule={handleNextModule}
          onContinueTalk={handleContinueTalk}
          isLoading={isLoading}
        />
      )}

      {currentStep === 'stakeholder-motivation-form' && (
        <StakeholderMotivationForm 
          onSubmit={handleStakeholderMotivationSubmit}
          isLoading={isLoading}
        />
      )}

      {currentStep === 'stakeholder-motivation-results' && stakeholderStrategy && (
        <StakeholderMotivationResults
          results={stakeholderStrategy}
          onExport={handleStakeholderExport}
          onFinalize={handleStakeholderFinalize}
          onRequestRevision={handleStakeholderRevisionRequest}
          onNextModule={handleNextModule}
          onContinueTalk={handleContinueTalk}
          isLoading={isLoading}
        />
      )}

      {/* Chat Interface - appears when Continue Talk with Book is clicked */}
      {showChatInterface && (currentStep === 'mission-vision-results' || currentStep === 'stakeholder-motivation-results') && (
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg border border-orange-200">
            <div className="p-6 border-b border-orange-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-orange-600 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Continue Conversation
                </h3>
                <button
                  onClick={() => setShowChatInterface(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Close chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-2">Continue your conversation about the book based on your selected results.</p>
            </div>
            
            <div className="h-96 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p>Start a conversation about your results...</p>
                  </div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))
                )}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleChatSubmit(chatInput)}
                    placeholder="Ask about your results or the book content..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    disabled={isChatLoading}
                  />
                  <button
                    onClick={() => handleChatSubmit(chatInput)}
                    disabled={isChatLoading || !chatInput.trim()}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                             disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isChatLoading ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
