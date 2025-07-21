import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import LanguageSelection from './LanguageSelection';
import FeatureWalkthrough from './FeatureWalkthrough';
import PermissionRequest from './PermissionRequest';
import FarmingTypeSelection from './FarmingTypeSelection';
import CropSelection from './CropSelection';

const OnboardingFlow = () => {
  const { dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const skipStep = () => {
    nextStep();
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LanguageSelection onNext={nextStep} />;
      case 2:
      case 3:
      case 4:
        return (
          <FeatureWalkthrough 
            currentStep={currentStep} 
            onNext={nextStep} 
            onSkip={skipStep} 
          />
        );
      case 5:
        return (
          <PermissionRequest 
            type="notifications" 
            onNext={nextStep} 
            onSkip={skipStep} 
          />
        );
      case 6:
        return (
          <PermissionRequest 
            type="location" 
            onNext={nextStep} 
            onSkip={skipStep} 
          />
        );
      case 7:
        return (
          <FarmingTypeSelection 
            onNext={nextStep} 
            onSkip={skipStep} 
          />
        );
      case 8:
        return <CropSelection onNext={completeOnboarding} />;
      default:
        return <LanguageSelection onNext={nextStep} />;
    }
  };

  return <div className="min-h-screen">{renderStep()}</div>;
};

export default OnboardingFlow;