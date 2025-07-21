import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'bn', name: 'বাংলা (Bangla)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
];

const LanguageSelection = ({ onNext }) => {
  const { state, dispatch } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState(state.selectedLanguage);

  const handleAccept = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: selectedLanguage });
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-5 safe-area-top">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf size={32} className="text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {getTranslation(selectedLanguage, 'selectLanguage')}
          </h1>
        </div>

        <div className="space-y-3 mb-10">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setSelectedLanguage(language.name)}
              className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 ${
                selectedLanguage === language.name
                  ? 'bg-primary-100 border-2 border-primary-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                selectedLanguage === language.name
                  ? 'border-primary-500'
                  : 'border-gray-300'
              }`}>
                {selectedLanguage === language.name && (
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full"></div>
                )}
              </div>
              <span className={`text-base ${
                selectedLanguage === language.name
                  ? 'text-primary-600 font-semibold'
                  : 'text-gray-700'
              }`}>
                {language.name}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            {getTranslation(selectedLanguage, 'termsText')}{' '}
            <span className="text-primary-600 underline">
              {getTranslation(selectedLanguage, 'termsOfUse')}
            </span>{' '}
            {getTranslation(selectedLanguage, 'and')}{' '}
            <span className="text-primary-600 underline">
              {getTranslation(selectedLanguage, 'privacyPolicy')}
            </span>
          </p>
        </div>

        <button onClick={handleAccept} className="btn-primary">
          {getTranslation(selectedLanguage, 'accept')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;