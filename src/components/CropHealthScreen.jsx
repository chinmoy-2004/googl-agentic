import React, { useState, useRef } from 'react';
import { Camera, ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';
import { callGeminiAPI } from '../config/gemini.js';
import { useApp } from '../contexts/AppContext.jsx';
import { getTranslation } from '../utils/translations.js';
import { saveToIndexedDB } from '../utils/indexedDB.js';

const CropHealthScreen = ({ onBack }) => {
  const context = useApp();
  const state = context?.state || { selectedLanguage: 'English', isOnline: true };
  const dispatch = context?.dispatch || (() => {});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = {
          uri: e.target.result,
          base64: e.target.result.split(',')[1]
        };
        setSelectedImage(imageData);
        await analyzeCrop(imageData.base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const analyzeCrop = async (imageBase64) => {
    try {
      setIsAnalyzing(true);
      setDiagnosis('');
      
      const prompt = "Analyze this crop image for diseases, pests, or health issues. Provide a detailed diagnosis and treatment recommendations.";
      
      if (!state.isOnline) {
        // Save for offline processing
        const uploadData = {
          id: Date.now().toString(),
          image: imageBase64,
          prompt,
          timestamp: new Date().toISOString()
        };
        
        await saveToIndexedDB('pendingUploads', uploadData);
        dispatch({ type: 'ADD_PENDING_UPLOAD', payload: uploadData });
        
        setDiagnosis('Image saved for analysis. Will process when connection is restored.');
      } else {
        const result = await callGeminiAPI(prompt, imageBase64);
        setDiagnosis(result);
      }
    } catch (error) {
      console.error('Failed to analyze image:', error);
      setDiagnosis('Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setDiagnosis('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 safe-area-top">
        <div className="flex justify-between items-center px-5 py-4">
          <button onClick={onBack} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {getTranslation(state.selectedLanguage, 'identifyCropProblem')}
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Image Display Area */}
        <div className="relative mb-6">
          {selectedImage ? (
            <div className="relative">
              <img 
                src={selectedImage.uri} 
                alt="Crop analysis" 
                className="w-full h-64 object-cover rounded-2xl"
              />
              <button
                onClick={resetAnalysis}
                className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ) : (
            <div className="h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-100">
              <Camera size={60} className="text-gray-400 mb-4" />
              <p className="text-base text-gray-500">
                {getTranslation(state.selectedLanguage, 'noImageSelected')}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={handleCameraCapture}
            className="btn-primary"
          >
            <Camera size={20} className="mr-2" />
            {getTranslation(state.selectedLanguage, 'takePhoto')}
          </button>
          
          <button 
            onClick={handleGallerySelect}
            className="btn-secondary"
          >
            <Upload size={20} className="mr-2" />
            {getTranslation(state.selectedLanguage, 'chooseFromGallery')}
          </button>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Analysis Section */}
        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {getTranslation(state.selectedLanguage, 'analyzingCrop')}
            </h3>
            <p className="text-sm text-gray-600">
              {getTranslation(state.selectedLanguage, 'analyzingDesc')}
            </p>
          </div>
        )}

        {/* Diagnosis Results */}
        {diagnosis && !isAnalyzing && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {getTranslation(state.selectedLanguage, 'diagnosisAndTreatment')}
            </h3>
            <div className="card border-l-4 border-l-primary-500">
              <p className="text-base text-gray-700 leading-relaxed">{diagnosis}</p>
            </div>
            
            <button 
              onClick={resetAnalysis}
              className="w-full mt-4 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
            >
              {getTranslation(state.selectedLanguage, 'analyzeAnother')}
            </button>
          </div>
        )}

        {/* Instructions */}
        {!selectedImage && !isAnalyzing && (
          <div className="card">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              {getTranslation(state.selectedLanguage, 'bestResults')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">
                  {getTranslation(state.selectedLanguage, 'instruction1')}
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">
                  {getTranslation(state.selectedLanguage, 'instruction2')}
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">
                  {getTranslation(state.selectedLanguage, 'instruction3')}
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">
                  {getTranslation(state.selectedLanguage, 'instruction4')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Offline Notice */}
        {!state.isOnline && (
          <div className="card border-l-4 border-l-yellow-500 bg-yellow-50">
            <div className="flex items-start">
              <AlertCircle size={20} className="text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Offline Mode</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Images will be analyzed when connection is restored.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropHealthScreen;