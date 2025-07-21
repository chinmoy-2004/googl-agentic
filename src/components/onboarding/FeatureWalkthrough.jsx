import React from 'react';
import { Stethoscope, Package, Users } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const features = [
  {
    id: 1,
    titleKey: 'instantDiseaseDetection',
    descriptionKey: 'diseaseDetectionDesc',
    icon: Stethoscope,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
  },
  {
    id: 2,
    titleKey: 'greatProductDeals',
    descriptionKey: 'productDealsDesc',
    icon: Package,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 3,
    titleKey: 'supportiveCommunity',
    descriptionKey: 'communityDesc',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
];

const FeatureWalkthrough = ({ currentStep, onNext, onSkip }) => {
  const { state } = useApp();
  const feature = features[currentStep - 2];
  const IconComponent = feature.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col p-5 safe-area-top">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className={`w-40 h-40 ${feature.bgColor} rounded-full flex items-center justify-center mb-10`}>
          <IconComponent size={80} className={feature.color} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {getTranslation(state.selectedLanguage, feature.titleKey)}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed px-8 mb-10">
          {getTranslation(state.selectedLanguage, feature.descriptionKey)}
        </p>
        
        <div className="flex justify-center space-x-2 mb-10">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep - 2 
                  ? 'w-6 bg-primary-500' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={onSkip}
          className="py-3 px-6 text-gray-600 font-medium"
        >
          {getTranslation(state.selectedLanguage, 'skip')}
        </button>
        
        <button onClick={onNext} className="btn-primary">
          {getTranslation(state.selectedLanguage, 'next')}
        </button>
      </div>
    </div>
  );
};

export default FeatureWalkthrough;