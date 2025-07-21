import React, { useState, useEffect } from 'react';
import { Mic, Send, ArrowLeft, Globe, Volume2 } from 'lucide-react';
import { callGeminiAPI } from '../config/gemini';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';
import { useSpeechRecognition, useSpeechSynthesis } from '../hooks/useSpeechAPI';

const VoiceInputScreen = ({ onBack }) => {
  const { state } = useApp();
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    isSupported: speechSupported 
  } = useSpeechRecognition();
  
  const { speak, isSpeaking, stop: stopSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    try {
      setIsLoading(true);
      const aiResponse = await callGeminiAPI(inputText);
      setResponse(aiResponse);
      
      // Text-to-speech for the response
      speak(aiResponse);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakResponse = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(response);
    }
  };

  const quickQuestions = [
    { key: 'tomatoDiseases', text: 'What diseases affect tomato plants?' },
    { key: 'wheatPrices', text: 'Current market price of wheat' },
    { key: 'governmentSchemes', text: 'Government schemes for farmers' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 safe-area-top">
        <div className="flex justify-between items-center px-5 py-4">
          <button onClick={onBack} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {getTranslation(state.selectedLanguage, 'aiAssistant')}
          </h1>
          <button className="flex items-center bg-primary-100 px-3 py-1 rounded-full">
            <Globe size={16} className="text-primary-600 mr-1" />
            <span className="text-xs text-primary-600 font-medium">
              {getTranslation(state.selectedLanguage, 'language')}
            </span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 pb-20">
        {/* Voice Input Section */}
        <div className="text-center mb-8">
          <button 
            onClick={handleVoiceInput}
            disabled={isLoading || !speechSupported}
            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mb-4 mx-auto transition-all duration-200 ${
              isListening 
                ? 'bg-primary-500 border-primary-600' 
                : 'bg-primary-100 border-primary-500 hover:bg-primary-200'
            } ${!speechSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Mic size={40} className={isListening ? 'text-white' : 'text-primary-500'} />
          </button>
          <p className="text-base text-gray-600">
            {isListening 
              ? getTranslation(state.selectedLanguage, 'listening')
              : speechSupported 
                ? getTranslation(state.selectedLanguage, 'clickToSpeak')
                : 'Voice input not supported in this browser'
            }
          </p>
        </div>

        {/* Text Input */}
        <div className="flex items-end space-x-3 mb-6">
          <textarea
            className="input-field flex-1 resize-none"
            placeholder={getTranslation(state.selectedLanguage, 'writeToKnow')}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
          />
          <button 
            onClick={handleSubmit}
            disabled={!inputText.trim() || isLoading}
            className={`touch-target rounded-full transition-colors duration-200 ${
              inputText.trim() && !isLoading
                ? 'bg-primary-500 hover:bg-primary-600' 
                : 'bg-gray-300'
            }`}
          >
            <Send size={20} className="text-white" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-base text-gray-600">
              {getTranslation(state.selectedLanguage, 'gettingResponse')}
            </p>
          </div>
        )}

        {/* Response Section */}
        {response && !isLoading && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {getTranslation(state.selectedLanguage, 'aiResponse')}
              </h3>
              <button 
                onClick={handleSpeakResponse}
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
              >
                <Volume2 size={16} />
                <span className="text-sm">{isSpeaking ? 'Stop' : 'Listen'}</span>
              </button>
            </div>
            <div className="card border-l-4 border-l-primary-500">
              <p className="text-base text-gray-700 leading-relaxed">{response}</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            {getTranslation(state.selectedLanguage, 'quickQuestions')}
          </h3>
          <div className="space-y-3">
            {quickQuestions.map((question) => (
              <button
                key={question.key}
                onClick={() => setInputText(question.text)}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm text-gray-700">
                  {getTranslation(state.selectedLanguage, question.key)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInputScreen;