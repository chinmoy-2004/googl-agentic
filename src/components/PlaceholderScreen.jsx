import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const PlaceholderScreen = ({ title, onBack }) => {
  const { state } = useApp();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 safe-area-top">
        <div className="flex justify-between items-center px-5 py-4">
          <button onClick={onBack} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-10">
        <div className="text-center">
          <div className="text-8xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {getTranslation(state.selectedLanguage, 'comingSoon')}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {getTranslation(state.selectedLanguage, 'featureUnderDevelopment')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderScreen;