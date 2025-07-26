import { useState } from 'react';

interface MissionVisionInputs {
  currentScenario: string;
  industry: string;
  marketSegment: string;
  intendedToBe: string;
  goal: string;
  additionalContext: string;
}

interface MissionVisionFormProps {
  onSubmit: (inputs: MissionVisionInputs) => void;
  isLoading?: boolean;
}

export function MissionVisionForm({ onSubmit, isLoading = false }: MissionVisionFormProps) {
  const [inputs, setInputs] = useState<MissionVisionInputs>({
    currentScenario: '',
    industry: '',
    marketSegment: '',
    intendedToBe: '',
    goal: '',
    additionalContext: ''
  });

  const [errors, setErrors] = useState<Partial<MissionVisionInputs>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<MissionVisionInputs> = {};
    
    if (!inputs.currentScenario.trim()) {
      newErrors.currentScenario = 'Current scenario is required';
    }
    if (!inputs.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }
    if (!inputs.goal.trim()) {
      newErrors.goal = 'Goal is required';
    }
    if (!inputs.intendedToBe.trim()) {
      newErrors.intendedToBe = 'Intended TO-BE scenario is required';
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

  const handleInputChange = (field: keyof MissionVisionInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 scrollable-content">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-900 mb-2">
            Mission & Vision Creation - Module 1
          </h2>
          <p className="text-gray-600">
            Based on "The 7Ms of Digital Transformation" - Chapter 2 Template
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Scenario */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current / As-IS Scenario *
          </label>
          <textarea
            value={inputs.currentScenario}
            onChange={(e) => handleInputChange('currentScenario', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.currentScenario ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Describe your organization's current state, challenges, and existing digital capabilities..."
          />
          {errors.currentScenario && (
            <p className="text-red-500 text-sm mt-1">{errors.currentScenario}</p>
          )}
        </div>

        {/* Industry and Market */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Industry *
            </label>
            <input
              type="text"
              value={inputs.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.industry ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Healthcare, Manufacturing, Retail..."
            />
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Market Segment
            </label>
            <input
              type="text"
              value={inputs.marketSegment}
              onChange={(e) => handleInputChange('marketSegment', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., B2B, B2C, Enterprise, SME..."
            />
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Transformation Goal *
          </label>
          <textarea
            value={inputs.goal}
            onChange={(e) => handleInputChange('goal', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.goal ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="What do you want to achieve through digital transformation? What are your key objectives?"
          />
          {errors.goal && (
            <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
          )}
        </div>

        {/* Intended TO-BE */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Intended TO-BE for Transformation *
          </label>
          <textarea
            value={inputs.intendedToBe}
            onChange={(e) => handleInputChange('intendedToBe', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.intendedToBe ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Describe your vision of the future state after digital transformation. What will your organization look like?"
          />
          {errors.intendedToBe && (
            <p className="text-red-500 text-sm mt-1">{errors.intendedToBe}</p>
          )}
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
            placeholder="Any additional information that might help in creating your mission and vision statements..."
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
                Generating Mission & Vision...
              </span>
            ) : (
              'Generate Mission & Vision Statements'
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export type { MissionVisionInputs };
