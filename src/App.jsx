import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import SplashScreen from './components/SplashScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import HomeScreen from './components/home/HomeScreen';
import VoiceInputScreen from './components/VoiceInputScreen';
import CropHealthScreen from './components/CropHealthScreen';
import MarketPricesScreen from './components/MarketPricesScreen';
import GovernmentSchemesScreen from './components/GovernmentSchemesScreen';
import CropCalendarScreen from './components/CropCalendarScreen';
import PlaceholderScreen from './components/PlaceholderScreen';
import BottomNavigation from './components/BottomNavigation';
import OfflineIndicator from './components/OfflineIndicator';

const AppContent = () => {
  const { state } = useApp();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeTab, setActiveTab] = useState('home');

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      setCurrentScreen('home');
    } else if (tabId === 'market') {
      setCurrentScreen('market');
    } else {
      setCurrentScreen('placeholder');
    }
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  // Show splash screen while loading
  if (state.loading) {
    return <SplashScreen />;
  }

  // Show onboarding if not completed
  if (state.currentScreen === 'onboarding' || !state.onboardingCompleted) {
    return <OnboardingFlow />;
  }

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} />;
      case 'voiceInput':
        return <VoiceInputScreen onBack={handleBack} />;
      case 'cropHealth':
        return <CropHealthScreen onBack={handleBack} />;
      case 'market':
        return <MarketPricesScreen onBack={handleBack} />;
      case 'governmentSchemes':
        return <GovernmentSchemesScreen onBack={handleBack} />;
      case 'cropCalendar':
        return <CropCalendarScreen onBack={handleBack} />;
      case 'placeholder':
        return (
          <PlaceholderScreen 
            title={
              activeTab === 'community' ? 'Community' :
              activeTab === 'profile' ? 'Profile' : 'Feature'
            }
            onBack={handleBack} 
          />
        );
      default:
        return <HomeScreen onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <OfflineIndicator />
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      {(currentScreen === 'home' || currentScreen === 'market' || currentScreen === 'placeholder') && (
        <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}