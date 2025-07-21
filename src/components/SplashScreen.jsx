import React from 'react';
import { Leaf } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const SplashScreen = () => {
  const { state } = useApp();
  
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-5">
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <Leaf size={48} className="text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {getTranslation(state.selectedLanguage, 'appTitle')}
        </h1>
        <p className="text-base text-gray-600 text-center">
          {getTranslation(state.selectedLanguage, 'appSubtitle')}
        </p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;