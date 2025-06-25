import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { ProcessingStep } from '../App';

interface ProcessingStatusProps {
  currentStep: ProcessingStep;
  fileName: string;
  error: string;
  onReset: () => void;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  currentStep,
  fileName,
  error,
  onReset,
}) => {
  const steps = [
    { key: 'uploading', label: 'Uploading PDF', description: 'Transferring your file...' },
    { key: 'processing', label: 'Processing PDF', description: 'Extracting text content...' },
    { key: 'generating', label: 'Generating Materials', description: 'Creating summaries and flashcards...' },
  ];

  if (currentStep === 'error') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-400 mb-2">Processing Error</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={onReset}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="text-center mb-6">
          <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold mb-2">Processing {fileName}</h3>
          <p className="text-gray-400">Please wait while we generate your study materials...</p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = step.key === currentStep;
            const isCompleted = steps.findIndex(s => s.key === currentStep) > index;
            
            return (
              <div
                key={step.key}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  isActive ? 'bg-blue-900/20 border border-blue-500' : 
                  isCompleted ? 'bg-green-900/20 border border-green-500' : 
                  'bg-zinc-800 border border-zinc-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-blue-400' : 
                  isCompleted ? 'bg-green-400' : 
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium">{step.label}</h4>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                {isActive && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;