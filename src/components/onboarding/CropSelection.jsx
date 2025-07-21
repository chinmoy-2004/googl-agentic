import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const crops = [
  { id: 'almond', nameKey: 'almond', emoji: '🌰' },
  { id: 'apple', nameKey: 'apple', emoji: '🍎' },
  { id: 'apricot', nameKey: 'apricot', emoji: '🍑' },
  { id: 'banana', nameKey: 'banana', emoji: '🍌' },
  { id: 'barley', nameKey: 'barley', emoji: '🌾' },
  { id: 'bean', nameKey: 'bean', emoji: '🫘' },
  { id: 'bitter-gourd', nameKey: 'bitterGourd', emoji: '🥒' },
  { id: 'black-gram', nameKey: 'blackGram', emoji: '⚫' },
  { id: 'brinjal', nameKey: 'brinjal', emoji: '🍆' },
  { id: 'cabbage', nameKey: 'cabbage', emoji: '🥬' },
  { id: 'canola', nameKey: 'canola', emoji: '🌻' },
  { id: 'capsicum', nameKey: 'capsicum', emoji: '🫑' },
  { id: 'chilli', nameKey: 'chilli', emoji: '🌶️' },
  { id: 'corn', nameKey: 'corn', emoji: '🌽' },
  { id: 'cotton', nameKey: 'cotton', emoji: '☁️' },
  { id: 'cucumber', nameKey: 'cucumber', emoji: '🥒' },
  { id: 'garlic', nameKey: 'garlic', emoji: '🧄' },
  { id: 'ginger', nameKey: 'ginger', emoji: '🫚' },
  { id: 'grape', nameKey: 'grape', emoji: '🍇' },
  { id: 'green-gram', nameKey: 'greenGram', emoji: '🟢' },
  { id: 'mango', nameKey: 'mango', emoji: '🥭' },
  { id: 'onion', nameKey: 'onion', emoji: '🧅' },
  { id: 'potato', nameKey: 'potato', emoji: '🥔' },
  { id: 'rice', nameKey: 'rice', emoji: '🍚' },
  { id: 'sugarcane', nameKey: 'sugarcane', emoji: '🎋' },
  { id: 'tomato', nameKey: 'tomato', emoji: '🍅' },
  { id: 'wheat', nameKey: 'wheat', emoji: '🌾' },
];

const CropSelection = ({ onNext }) => {
  const { state, dispatch } = useApp();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const maxCrops = 8;

  const toggleCrop = (cropId) => {
    setSelectedCrops(prev => {
      if (prev.includes(cropId)) {
        return prev.filter(id => id !== cropId);
      } else if (prev.length < maxCrops) {
        return [...prev, cropId];
      }
      return prev;
    });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_CROPS', payload: selectedCrops });
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-5 safe-area-top">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          {getTranslation(state.selectedLanguage, 'selectCrops')}
        </h1>
        <p className="text-base text-gray-600 mb-4">
          {getTranslation(state.selectedLanguage, 'selectCropsDesc')}
        </p>
        <p className="text-lg font-semibold text-primary-600">
          {selectedCrops.length}/{maxCrops}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mb-6">
        <div className="grid grid-cols-3 gap-4">
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => toggleCrop(crop.id)}
              className={`relative aspect-square flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                selectedCrops.includes(crop.id)
                  ? 'bg-primary-100 border-primary-500'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100'
              }`}
            >
              <span className="text-3xl mb-2">{crop.emoji}</span>
              <span className={`text-xs font-medium text-center leading-tight ${
                selectedCrops.includes(crop.id) ? 'text-primary-600' : 'text-gray-700'
              }`}>
                {getTranslation(state.selectedLanguage, crop.nameKey)}
              </span>
              {selectedCrops.includes(crop.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleNext}
        disabled={selectedCrops.length === 0}
        className={`btn-primary ${selectedCrops.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default CropSelection;