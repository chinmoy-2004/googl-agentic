import React from 'react';
import { Leaf, Plus, Camera, FileText, Pill, Cloud, MessageCircle, MoreHorizontal, Calendar, Building2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const HomeScreen = ({ onNavigate }) => {
  const { state } = useApp();
  const selectedCrops = state.selectedCrops.slice(0, 5);

  const quickActions = [
    {
      id: 'diagnose',
      titleKey: 'takePicture',
      icon: Camera,
      color: 'bg-red-500',
      action: () => onNavigate('cropHealth')
    },
    {
      id: 'schemes',
      titleKey: 'governmentSchemes',
      icon: Building2,
      color: 'bg-blue-500',
      action: () => onNavigate('governmentSchemes')
    },
    {
      id: 'market',
      titleKey: 'marketPrices',
      icon: ShoppingBag,
      color: 'bg-green-500',
      action: () => onNavigate('market')
    },
    {
      id: 'calendar',
      titleKey: 'cropCalendar',
      icon: Calendar,
      color: 'bg-purple-500',
      action: () => onNavigate('cropCalendar')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 safe-area-top">
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex items-center">
            <Leaf size={24} className="text-primary-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">
              {getTranslation(state.selectedLanguage, 'plantix')}
            </h1>
          </div>
          <button className="touch-target">
            <MoreHorizontal size={24} className="text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* User ID Display */}
        <div className="bg-gray-100 mx-5 mt-4 p-3 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            {getTranslation(state.selectedLanguage, 'userId')}: {state.user?.uid?.substring(0, 8) || 'Anonymous'}
          </p>
        </div>

        {/* Quick Actions Grid */}
        <section className="px-5 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="card hover:shadow-md transition-shadow duration-200 p-6 flex flex-col items-center text-center"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mb-3`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {getTranslation(state.selectedLanguage, action.titleKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Crops Section */}
        <section className="px-5 mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {getTranslation(state.selectedLanguage, 'yourCrops')}
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {selectedCrops.map((cropId, index) => (
              <div key={cropId} className="flex-shrink-0 flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">🌱</span>
                </div>
                <span className="text-xs text-gray-600 text-center max-w-16 truncate">
                  {cropId}
                </span>
              </div>
            ))}
            <button className="flex-shrink-0 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 border-2 border-dashed border-primary-500 rounded-full flex items-center justify-center mb-2">
                <Plus size={24} className="text-primary-500" />
              </div>
              <span className="text-xs text-gray-600">Add</span>
            </button>
          </div>
        </section>

        {/* Weather Card */}
        <section className="px-5 mt-8">
          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-gray-800">Dimow, 20 Jul</p>
                <p className="text-sm text-gray-600">Foggy</p>
              </div>
              <Cloud size={48} className="text-gray-400" />
            </div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-800">34°C</p>
                <p className="text-sm text-gray-600">25°C / 33°C</p>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                {getTranslation(state.selectedLanguage, 'sprayingUnfavorable')}
              </p>
            </div>
          </div>
        </section>

        {/* Heal Your Crop Section */}
        <section className="px-5 mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {getTranslation(state.selectedLanguage, 'healYourCrop')}
          </h2>
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col items-center flex-1">
                <Camera size={32} className="text-primary-500 mb-2" />
                <span className="text-xs text-gray-600 text-center">
                  {getTranslation(state.selectedLanguage, 'takePicture')}
                </span>
              </div>
              <div className="px-4">
                <span className="text-xl text-gray-300">→</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <FileText size={32} className="text-blue-500 mb-2" />
                <span className="text-xs text-gray-600 text-center">
                  {getTranslation(state.selectedLanguage, 'seeDiagnosis')}
                </span>
              </div>
              <div className="px-4">
                <span className="text-xl text-gray-300">→</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <Pill size={32} className="text-red-500 mb-2" />
                <span className="text-xs text-gray-600 text-center">
                  {getTranslation(state.selectedLanguage, 'getMedicine')}
                </span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('cropHealth')}
              className="btn-primary w-full"
            >
              <Camera size={20} className="mr-2" />
              {getTranslation(state.selectedLanguage, 'takePicture')}
            </button>
          </div>
        </section>

        {/* Manage Fields Section */}
        <section className="px-5 mt-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {getTranslation(state.selectedLanguage, 'manageFields')}
          </h2>
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {getTranslation(state.selectedLanguage, 'startPrecisionFarming')}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {getTranslation(state.selectedLanguage, 'precisionFarmingDesc')}
            </p>
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🚜</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => onNavigate('voiceInput')}
        className="fixed bottom-24 right-5 w-14 h-14 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 z-10"
      >
        <MessageCircle size={24} className="text-white" />
      </button>
    </div>
  );
};

export default HomeScreen;