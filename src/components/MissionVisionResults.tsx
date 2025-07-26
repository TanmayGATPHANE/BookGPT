import { useState } from 'react';

interface MissionVisionOption {
  id: string;
  mission: string;
  vision: string;
  rationale: string;
}

interface MissionVisionResultsProps {
  options: MissionVisionOption[];
  onSelectOption: (option: MissionVisionOption) => void;
  onRequestRevision: (feedback: string) => void;
  onNextModule?: () => void;
  onContinueTalk?: () => void;
  isLoading?: boolean;
}

export function MissionVisionResults({ 
  options, 
  onSelectOption, 
  onRequestRevision,
  onNextModule,
  onContinueTalk,
  isLoading = false 
}: MissionVisionResultsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [finalizedOption, setFinalizedOption] = useState<MissionVisionOption | null>(null);

  const handleSelectOption = (option: MissionVisionOption) => {
    setSelectedOption(option.id);
    onSelectOption(option);
  };

  const handleRequestRevision = () => {
    if (revisionFeedback.trim()) {
      onRequestRevision(revisionFeedback);
      setRevisionFeedback('');
      setShowRevisionForm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700">
            Generating Mission & Vision Options...
          </h3>
          <p className="text-gray-500 mt-2">
            Using insights from "The 7Ms of Digital Transformation" and external knowledge sources
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 scrollable-content">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-orange-900 mb-2">
          Mission & Vision Statement Options
        </h2>
        <p className="text-gray-600 mb-6">
          Based on your inputs and insights from "The 7Ms of Digital Transformation" Chapter 2
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {options.map((option, index) => (
            <div
              key={option.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                selectedOption === option.id
                  ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}
              onClick={() => handleSelectOption(option)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Option {index + 1}
                </h3>
                {selectedOption === option.id && (
                  <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Selected
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Mission Statement</h4>
                  <p className="text-gray-700 italic bg-gray-50 p-3 rounded border-l-4 border-orange-400">
                    "{option.mission}"
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Vision Statement</h4>
                  <p className="text-gray-700 italic bg-gray-50 p-3 rounded border-l-4 border-orange-400">
                    "{option.vision}"
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Rationale</h4>
                  <p className="text-gray-600 text-sm">
                    {option.rationale}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
            <div className="flex-1">
              {selectedOption ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-800 font-medium">
                      Option selected! You can proceed with this mission and vision.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-800">
                      Please select an option that best aligns with your organization's goals.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRevisionForm(!showRevisionForm)}
                className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                         transition-colors duration-200"
              >
                Request Revision
              </button>
              
              {selectedOption && !isFinalized && (
                <button
                  onClick={() => {
                    const selected = options.find(opt => opt.id === selectedOption);
                    if (selected) {
                      setFinalizedOption(selected);
                      setIsFinalized(true);
                      handleSelectOption(selected);
                    }
                  }}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                           transition-colors duration-200"
                >
                  Finalize Selection
                </button>
              )}

              {isFinalized && (
                <div className="flex flex-wrap gap-3">
                  {onNextModule && (
                    <button
                      onClick={onNextModule}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                               transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>Next Module</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  
                  {onContinueTalk && (
                    <button
                      onClick={onContinueTalk}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                               transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Continue Talk with Book</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {showRevisionForm && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-3">Request Revision</h4>
              <textarea
                value={revisionFeedback}
                onChange={(e) => setRevisionFeedback(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Please describe what changes you'd like to see in the mission and vision statements..."
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleRequestRevision}
                  disabled={!revisionFeedback.trim()}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                           transition-colors duration-200"
                >
                  Submit Revision Request
                </button>
                <button
                  onClick={() => {
                    setShowRevisionForm(false);
                    setRevisionFeedback('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                           transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {isFinalized && finalizedOption && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h4 className="text-green-800 font-semibold mb-2">Mission & Vision Finalized! ✓</h4>
                  <p className="text-green-700 text-sm mb-3">
                    Your selected mission and vision statements have been saved. You can now proceed to the next module or make changes.
                  </p>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-gray-700 text-sm mb-2">Selected Option:</h5>
                    <p className="text-xs text-gray-600 mb-2"><strong>Mission:</strong> {finalizedOption.mission}</p>
                    <p className="text-xs text-gray-600"><strong>Vision:</strong> {finalizedOption.vision}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type { MissionVisionOption };
