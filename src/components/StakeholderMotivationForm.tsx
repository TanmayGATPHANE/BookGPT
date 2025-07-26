import { useState } from 'react';

interface StakeholderInput {
  name: string;
  role: string;
  department: string;
  influence: 'High' | 'Medium' | 'Low';
  interest: 'High' | 'Medium' | 'Low';
  currentStance: 'Champion' | 'Supporter' | 'Neutral' | 'Skeptic' | 'Blocker';
  motivationFactors: string;
  communicationPreference: 'Email' | 'Meetings' | 'Reports' | 'Informal' | 'Data/Analytics';
}

interface StakeholderMotivationInputs {
  organizationChart: string;
  keyStakeholders: StakeholderInput[];
  transformationScope: string;
  currentChallenges: string;
  timeframe: string;
  resources: string;
  additionalContext: string;
}

interface StakeholderMotivationFormProps {
  onSubmit: (inputs: StakeholderMotivationInputs) => void;
  isLoading?: boolean;
}

export function StakeholderMotivationForm({ onSubmit, isLoading = false }: StakeholderMotivationFormProps) {
  const [inputs, setInputs] = useState<StakeholderMotivationInputs>({
    organizationChart: '',
    keyStakeholders: [
      {
        name: '',
        role: '',
        department: '',
        influence: 'Medium',
        interest: 'Medium',
        currentStance: 'Neutral',
        motivationFactors: '',
        communicationPreference: 'Meetings'
      }
    ],
    transformationScope: '',
    currentChallenges: '',
    timeframe: '',
    resources: '',
    additionalContext: ''
  });

  const [errors, setErrors] = useState<Partial<StakeholderMotivationInputs>>({});

  const addStakeholder = () => {
    setInputs(prev => ({
      ...prev,
      keyStakeholders: [
        ...prev.keyStakeholders,
        {
          name: '',
          role: '',
          department: '',
          influence: 'Medium',
          interest: 'Medium',
          currentStance: 'Neutral',
          motivationFactors: '',
          communicationPreference: 'Meetings'
        }
      ]
    }));
  };

  const removeStakeholder = (index: number) => {
    setInputs(prev => ({
      ...prev,
      keyStakeholders: prev.keyStakeholders.filter((_, i) => i !== index)
    }));
  };

  const updateStakeholder = (index: number, field: keyof StakeholderInput, value: string) => {
    setInputs(prev => ({
      ...prev,
      keyStakeholders: prev.keyStakeholders.map((stakeholder, i) => 
        i === index ? { ...stakeholder, [field]: value } : stakeholder
      )
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StakeholderMotivationInputs> = {};
    
    if (!inputs.organizationChart.trim()) {
      newErrors.organizationChart = 'Organization chart description is required';
    }
    if (!inputs.transformationScope.trim()) {
      newErrors.transformationScope = 'Transformation scope is required';
    }
    if (!inputs.currentChallenges.trim()) {
      newErrors.currentChallenges = 'Current challenges are required';
    }
    if (inputs.keyStakeholders.length === 0 || inputs.keyStakeholders.every(s => !s.name.trim())) {
      newErrors.currentChallenges = 'At least one stakeholder is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(inputs);
    }
  };

  const handleInputChange = (field: keyof StakeholderMotivationInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 scrollable-content">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-900 mb-2">
            Stakeholder Motivation - Module 2
          </h2>
          <p className="text-gray-600">
            Based on "The 7Ms of Digital Transformation" - Chapter 3: SMILE Framework
          </p>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>SMILE Framework:</strong> Stakeholder identification, Motivation mapping, 
              Influence assessment, Leadership engagement, and Engagement strategy
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
        {/* Organization Chart */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Organization Chart & Structure *
          </label>
          <textarea
            value={inputs.organizationChart}
            onChange={(e) => handleInputChange('organizationChart', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.organizationChart ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Describe your organizational structure, reporting lines, key departments, and decision-making hierarchy..."
          />
          {errors.organizationChart && (
            <p className="text-red-500 text-sm mt-1">{errors.organizationChart}</p>
          )}
        </div>

        {/* Transformation Scope */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Transformation Scope & Impact *
          </label>
          <textarea
            value={inputs.transformationScope}
            onChange={(e) => handleInputChange('transformationScope', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.transformationScope ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Describe the scope of your digital transformation - which departments, processes, systems will be affected..."
          />
          {errors.transformationScope && (
            <p className="text-red-500 text-sm mt-1">{errors.transformationScope}</p>
          )}
        </div>

        {/* Key Stakeholders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Key Stakeholders *
            </label>
            <button
              type="button"
              onClick={addStakeholder}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              + Add Stakeholder
            </button>
          </div>
          
          <div className="space-y-6">
            {inputs.keyStakeholders.map((stakeholder, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Stakeholder {index + 1}</h4>
                  {inputs.keyStakeholders.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStakeholder(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={stakeholder.name}
                      onChange={(e) => updateStakeholder(index, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Role/Title</label>
                    <input
                      type="text"
                      value={stakeholder.role}
                      onChange={(e) => updateStakeholder(index, 'role', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="CEO, CTO, Operations Manager"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                    <input
                      type="text"
                      value={stakeholder.department}
                      onChange={(e) => updateStakeholder(index, 'department', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="IT, Operations, HR"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Influence Level</label>
                    <select
                      value={stakeholder.influence}
                      onChange={(e) => updateStakeholder(index, 'influence', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Interest Level</label>
                    <select
                      value={stakeholder.interest}
                      onChange={(e) => updateStakeholder(index, 'interest', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Current Stance</label>
                    <select
                      value={stakeholder.currentStance}
                      onChange={(e) => updateStakeholder(index, 'currentStance', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="Champion">Champion</option>
                      <option value="Supporter">Supporter</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Skeptic">Skeptic</option>
                      <option value="Blocker">Blocker</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Communication Preference</label>
                    <select
                      value={stakeholder.communicationPreference}
                      onChange={(e) => updateStakeholder(index, 'communicationPreference', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="Email">Email</option>
                      <option value="Meetings">Meetings</option>
                      <option value="Reports">Reports</option>
                      <option value="Informal">Informal</option>
                      <option value="Data/Analytics">Data/Analytics</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Key Motivation Factors</label>
                    <input
                      type="text"
                      value={stakeholder.motivationFactors}
                      onChange={(e) => updateStakeholder(index, 'motivationFactors', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Cost savings, efficiency, innovation..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Challenges */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Stakeholder Challenges *
          </label>
          <textarea
            value={inputs.currentChallenges}
            onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.currentChallenges ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="What resistance, concerns, or challenges do you anticipate from stakeholders?"
          />
          {errors.currentChallenges && (
            <p className="text-red-500 text-sm mt-1">{errors.currentChallenges}</p>
          )}
        </div>

        {/* Timeline and Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transformation Timeframe
            </label>
            <input
              type="text"
              value={inputs.timeframe}
              onChange={(e) => handleInputChange('timeframe', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 18 months, 3 years..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Available Resources
            </label>
            <input
              type="text"
              value={inputs.resources}
              onChange={(e) => handleInputChange('resources', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Budget, team size, external support..."
            />
          </div>
        </div>

        {/* Additional Context */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Context (Optional)
          </label>
          <textarea
            value={inputs.additionalContext}
            onChange={(e) => handleInputChange('additionalContext', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={3}
            placeholder="Previous change initiatives, organizational culture, specific concerns..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Stakeholder Strategy...
              </span>
            ) : (
              'Generate Stakeholder Motivation Strategy'
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export type { StakeholderMotivationInputs, StakeholderInput };
