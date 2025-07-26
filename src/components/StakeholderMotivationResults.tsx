import { useState } from 'react';

interface StakeholderMapping {
  name: string;
  role: string;
  quadrant: 'Manage Closely' | 'Keep Satisfied' | 'Keep Informed' | 'Monitor';
  influenceLevel: 'High' | 'Medium' | 'Low';
  interestLevel: 'High' | 'Medium' | 'Low';
  currentStance: string;
  motivationStrategy: string;
  communicationPlan: string;
  engagementFrequency: string;
  keyMessages: string[];
  successMetrics: string[];
}

interface SMILEFrameworkOutput {
  stakeholderMappings: StakeholderMapping[];
  overallStrategy: string;
  communicationTimeline: {
    phase: string;
    timeframe: string;
    activities: string[];
    stakeholders: string[];
  }[];
  riskMitigation: {
    risk: string;
    probability: 'High' | 'Medium' | 'Low';
    impact: 'High' | 'Medium' | 'Low';
    mitigation: string;
  }[];
  trackingMetrics: {
    metric: string;
    frequency: string;
    target: string;
    measurement: string;
  }[];
}

interface StakeholderMotivationResultsProps {
  results: SMILEFrameworkOutput;
  onExport: () => void;
  onFinalize: () => void;
  onRequestRevision: (feedback: string) => void;
  onNextModule?: () => void;
  onContinueTalk?: () => void;
  isLoading?: boolean;
}

export function StakeholderMotivationResults({ 
  results, 
  onExport, 
  onFinalize, 
  onRequestRevision,
  onNextModule,
  onContinueTalk,
  isLoading = false 
}: StakeholderMotivationResultsProps) {
  const [activeTab, setActiveTab] = useState<'mapping' | 'strategy' | 'timeline' | 'risks' | 'tracking'>('mapping');
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const handleRequestRevision = () => {
    if (revisionFeedback.trim()) {
      onRequestRevision(revisionFeedback);
      setRevisionFeedback('');
      setShowRevisionForm(false);
    }
  };

  const handleFinalize = () => {
    setIsFinalized(true);
    onFinalize();
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700">
            Generating SMILE Framework Strategy...
          </h3>
          <p className="text-gray-500 mt-2">
            Analyzing stakeholders and creating motivation strategies using Chapter 3 insights
          </p>
        </div>
      </div>
    );
  }

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'Manage Closely': return 'bg-red-100 text-red-800 border-red-200';
      case 'Keep Satisfied': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Keep Informed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Monitor': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStanceColor = (stance: string) => {
    if (stance.toLowerCase().includes('champion')) return 'text-green-600';
    if (stance.toLowerCase().includes('supporter')) return 'text-blue-600';
    if (stance.toLowerCase().includes('neutral')) return 'text-gray-600';
    if (stance.toLowerCase().includes('skeptic')) return 'text-yellow-600';
    if (stance.toLowerCase().includes('blocker')) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 scrollable-content">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-orange-900 mb-2">
          SMILE Framework - Stakeholder Motivation Strategy
        </h2>
        <p className="text-gray-600 mb-4">
          Based on your inputs and insights from "The 7Ms of Digital Transformation" Chapter 3
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
          {[
            { id: 'mapping', label: 'Stakeholder Mapping', icon: '👥' },
            { id: 'strategy', label: 'Engagement Strategy', icon: '🎯' },
            { id: 'timeline', label: 'Communication Timeline', icon: '📅' },
            { id: 'risks', label: 'Risk Mitigation', icon: '⚠️' },
            { id: 'tracking', label: 'Tracking Metrics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 mr-2 mb-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'mapping' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stakeholder Power-Interest Matrix</h3>
            
            {/* Visual Matrix */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-4 h-96">
                {/* High Interest, High Influence */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">🔥 Manage Closely</h4>
                  <p className="text-xs text-red-600 mb-3">High Influence × High Interest</p>
                  <div className="space-y-2">
                    {results.stakeholderMappings
                      .filter(s => s.quadrant === 'Manage Closely')
                      .map((stakeholder, idx) => (
                        <div key={idx} className="bg-white p-2 rounded text-sm">
                          <div className="font-medium">{stakeholder.name}</div>
                          <div className="text-gray-600 text-xs">{stakeholder.role}</div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* High Interest, Low Influence */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">📢 Keep Informed</h4>
                  <p className="text-xs text-blue-600 mb-3">Low Influence × High Interest</p>
                  <div className="space-y-2">
                    {results.stakeholderMappings
                      .filter(s => s.quadrant === 'Keep Informed')
                      .map((stakeholder, idx) => (
                        <div key={idx} className="bg-white p-2 rounded text-sm">
                          <div className="font-medium">{stakeholder.name}</div>
                          <div className="text-gray-600 text-xs">{stakeholder.role}</div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Low Interest, High Influence */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">😊 Keep Satisfied</h4>
                  <p className="text-xs text-yellow-600 mb-3">High Influence × Low Interest</p>
                  <div className="space-y-2">
                    {results.stakeholderMappings
                      .filter(s => s.quadrant === 'Keep Satisfied')
                      .map((stakeholder, idx) => (
                        <div key={idx} className="bg-white p-2 rounded text-sm">
                          <div className="font-medium">{stakeholder.name}</div>
                          <div className="text-gray-600 text-xs">{stakeholder.role}</div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Low Interest, Low Influence */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">👁️ Monitor</h4>
                  <p className="text-xs text-gray-600 mb-3">Low Influence × Low Interest</p>
                  <div className="space-y-2">
                    {results.stakeholderMappings
                      .filter(s => s.quadrant === 'Monitor')
                      .map((stakeholder, idx) => (
                        <div key={idx} className="bg-white p-2 rounded text-sm">
                          <div className="font-medium">{stakeholder.name}</div>
                          <div className="text-gray-600 text-xs">{stakeholder.role}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stakeholder Cards */}
            <div className="grid gap-4">
              {results.stakeholderMappings.map((stakeholder, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{stakeholder.name}</h4>
                      <p className="text-sm text-gray-600">{stakeholder.role}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getQuadrantColor(stakeholder.quadrant)}`}>
                        {stakeholder.quadrant}
                      </span>
                      <span className={`text-sm font-medium ${getStanceColor(stakeholder.currentStance)}`}>
                        {stakeholder.currentStance}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Motivation Strategy:</p>
                      <p className="text-gray-600">{stakeholder.motivationStrategy}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Communication Plan:</p>
                      <p className="text-gray-600">{stakeholder.communicationPlan}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">Engagement: {stakeholder.engagementFrequency}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        Key Messages: {stakeholder.keyMessages.slice(0, 2).join(', ')}
                        {stakeholder.keyMessages.length > 2 && '...'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Overall Engagement Strategy</h3>
              <p className="text-blue-700">{results.overallStrategy}</p>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication & Engagement Timeline</h3>
            
            <div className="space-y-4">
              {results.communicationTimeline.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{phase.phase}</h4>
                      <p className="text-sm text-gray-600">{phase.timeframe}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Activities:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Key Stakeholders:</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.stakeholders.map((stakeholder, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                            {stakeholder}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stakeholder Risk Assessment & Mitigation</h3>
            
            <div className="space-y-4">
              {results.riskMitigation.map((risk, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{risk.risk}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        risk.probability === 'High' ? 'bg-red-100 text-red-700' :
                        risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {risk.probability} Probability
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        risk.impact === 'High' ? 'bg-red-100 text-red-700' :
                        risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {risk.impact} Impact
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Mitigation Strategy:</p>
                    <p className="text-gray-600">{risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stakeholder Engagement Tracking Metrics</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">How to Measure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.trackingMetrics.map((metric, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{metric.metric}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{metric.frequency}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{metric.target}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{metric.measurement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="flex gap-3">
            <button
              onClick={onExport}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Strategy</span>
            </button>
            
            <button
              onClick={() => setShowRevisionForm(!showRevisionForm)}
              className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Request Revision
            </button>
          </div>
          
          <button
            onClick={handleFinalize}
            disabled={isFinalized}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isFinalized ? 'Strategy Finalized ✓' : 'Finalize Strategy'}
          </button>
        </div>

        {showRevisionForm && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-3">Request Revision</h4>
            <textarea
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
              placeholder="Please describe what changes you'd like to see in the stakeholder strategy..."
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleRequestRevision}
                disabled={!revisionFeedback.trim()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                Submit Revision Request
              </button>
              <button
                onClick={() => {
                  setShowRevisionForm(false);
                  setRevisionFeedback('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isFinalized && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800 font-medium">
                Stakeholder strategy finalized! Ready to proceed to Module 3: Methods & Processes.
              </span>
            </div>
            
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

              <button
                onClick={() => {
                  setIsFinalized(false);
                  setShowRevisionForm(true);
                }}
                className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                         transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Request Revision</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export type { SMILEFrameworkOutput, StakeholderMapping };
