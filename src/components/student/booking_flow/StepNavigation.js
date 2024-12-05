import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function StepNavigation({ currentStep, canProceed, onBack, onNext }) {
  return (
    <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
          canProceed
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {currentStep === 'confirm' ? 'Complete Booking' : 'Next'}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}

export default StepNavigation;
