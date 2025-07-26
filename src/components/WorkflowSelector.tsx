import { useState } from 'react';
import { useApp } from '../context/AppContext';

interface Module {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'coming-soon' | 'completed';
  icon: string;
}

interface WorkflowSelectorProps {
  onModuleSelect: (moduleId: string) => void;
}

const MODULES: Module[] = [
  {
    id: 'mission-vision',
    title: 'Mission & Vision Creation',
    description: 'Generate mission and vision statements based on your current scenario and transformation goals using insights from The 7Ms methodology.',
    status: 'available',
    icon: '🎯'
  },
  {
    id: 'stakeholder-motivation',
    title: 'Stakeholder Motivation',
    description: 'Use the SMILE framework to map stakeholders, analyze motivations, and create engagement strategies for successful transformation.',
    status: 'available',
    icon: '👥'
  },
  {
    id: 'digital-strategy',
    title: 'Digital Strategy Framework',
    description: 'Develop a comprehensive digital strategy aligned with your mission and vision.',
    status: 'coming-soon',
    icon: '📋'
  },
  {
    id: 'transformation-roadmap',
    title: 'Transformation Roadmap',
    description: 'Create a detailed roadmap for implementing your digital transformation initiative.',
    status: 'coming-soon',
    icon: '🗺️'
  },
  {
    id: 'metrics-measurement',
    title: 'Metrics & Measurement',
    description: 'Define KPIs and measurement frameworks to track your transformation progress.',
    status: 'coming-soon',
    icon: '📊'
  }
];

export function WorkflowSelector({ onModuleSelect }: WorkflowSelectorProps) {
  const { selectedBook } = useApp();
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const handleModuleClick = (moduleId: string, status: string) => {
    if (status === 'available') {
      onModuleSelect(moduleId);
    }
  };

  // Only show workflow selector if "The 7Ms of Digital Transformation" is selected
  if (!selectedBook || selectedBook.title !== "The 7Ms of Digital Transformation") {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-900 mb-4">
            Digital Transformation Workflows
          </h2>
          <p className="text-gray-600 mb-6">
            Please select "The 7Ms of Digital Transformation" book to access structured workflow modules.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-orange-800">
                Book selection required for structured workflows
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-orange-900 mb-2">
            Digital Transformation Modules
          </h2>
          <p className="text-gray-600">
            Structured workflows based on "The 7Ms of Digital Transformation" methodology
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {MODULES.map((module) => (
            <div
              key={module.id}
              className={`border rounded-lg p-6 transition-all duration-200 ${
                module.status === 'available'
                  ? 'cursor-pointer hover:shadow-lg hover:border-orange-300 border-gray-200'
                  : 'cursor-not-allowed border-gray-200 opacity-60'
              } ${
                hoveredModule === module.id && module.status === 'available'
                  ? 'bg-orange-50 border-orange-400'
                  : 'bg-white'
              }`}
              onClick={() => handleModuleClick(module.id, module.status)}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{module.icon}</div>
                <div className="flex items-center">
                  {module.status === 'available' && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Available
                    </span>
                  )}
                  {module.status === 'coming-soon' && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                      Coming Soon
                    </span>
                  )}
                  {module.status === 'completed' && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {module.title}
              </h3>

              <p className="text-gray-600 mb-4 min-h-[3rem]">
                {module.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Module {MODULES.indexOf(module) + 1} of {MODULES.length}
                </div>
                {module.status === 'available' && (
                  <div className="flex items-center text-orange-600 text-sm font-medium">
                    Start Module
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">About These Modules</h4>
              <p className="text-blue-700 text-sm">
                Each module follows the structured approach outlined in "The 7Ms of Digital Transformation" 
                and uses Retrieval-Augmented Generation (RAG) to provide insights grounded in the book's content, 
                combined with relevant external knowledge sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { Module };
