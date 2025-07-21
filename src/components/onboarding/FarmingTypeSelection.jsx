import React, { useState } from 'react';
import { Flower, Home, Wheat } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const farmingTypes = [
  {
    id: 'pots',
    titleKey: 'growInPots',
    descriptionKey: 'potsDesc',
    icon: Flower,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100',
  },
  {
    id: 'garden',
    titleKey: 'growInGarden',
    descriptionKey: 'gardenDesc',
    icon: Home,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'fields',
    titleKey: 'growInFields',
    descriptionKey: 'fieldsDesc',
    icon: Wheat,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
  },
];

const FarmingTypeSelection = ({ onNext, onSkip }) => {
  const { state, dispatch } = useApp();
  const [selectedType, setSelectedType] = useState('');

  const handleNext = () => {
    if (selectedType) {
      dispatch({ type: 'SET_FARMING_TYPE', payload: selectedType });
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-5 safe-area-top">
      <div className="flex-1">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {getTranslation(state.selectedLanguage, 'chooseFarmingType')}
          </h1>
          <p className="text-base text-gray-600">
            {getTranslation(state.selectedLanguage, 'farmingTypeDesc')}
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {farmingTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`w-full flex items-center p-5 rounded-2xl transition-all duration-200 ${
                  selectedType === type.id
                    ? 'bg-primary-100 border-2 border-primary-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className={`w-16 h-16 ${type.bgColor} rounded-full flex items-center justify-center mr-4`}>
                  <IconComponent size={32} className={type.color} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`text-base font-semibold ${
                      selectedType === type.id ? 'text-primary-600' : 'text-gray-800'
                    }`}>
                      {getTranslation(state.selectedLanguage, type.titleKey)}
                    </h3>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedType === type.id
                        ? 'border-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedType === type.id && (
                        <div className="w-2.5 h-2.5 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getTranslation(state.selectedLanguage, type.descriptionKey)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={onSkip}
          className="py-3 px-6 text-gray-600 font-medium"
        >
          {getTranslation(state.selectedLanguage, 'skip')}
        </button>
        
        <button 
          onClick={handleNext}
          disabled={!selectedType}
          className={`btn-primary ${!selectedType ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {getTranslation(state.selectedLanguage, 'next')}
        </button>
      </div>
    </div>
  );
};

export default FarmingTypeSelection;