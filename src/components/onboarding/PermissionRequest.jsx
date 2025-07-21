import React from 'react';
import { Bell, MapPin } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getTranslation } from '../../utils/translations';

const permissions = {
  notifications: {
    titleKey: 'allowNotifications',
    descriptionKey: 'notificationDesc',
    icon: Bell,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  location: {
    titleKey: 'allowLocation',
    descriptionKey: 'locationDesc',
    icon: MapPin,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
  },
};

const PermissionRequest = ({ type, onNext, onSkip }) => {
  const { state } = useApp();
  const permission = permissions[type];
  const IconComponent = permission.icon;

  const handleAllow = async () => {
    try {
      if (type === 'notifications') {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            console.log('Notification permission granted');
          }
        }
      } else if (type === 'location') {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Location permission granted');
            },
            (error) => {
              console.log('Location permission denied');
            }
          );
        }
      }
      onNext();
    } catch (error) {
      console.error('Permission request error:', error);
      onNext(); // Continue anyway
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-5 safe-area-top">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className={`w-40 h-40 ${permission.bgColor} rounded-full flex items-center justify-center mb-10`}>
          <IconComponent size={80} className={permission.color} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {getTranslation(state.selectedLanguage, permission.titleKey)}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed px-8">
          {getTranslation(state.selectedLanguage, permission.descriptionKey)}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={onSkip}
          className="py-3 px-6 text-gray-600 font-medium"
        >
          {getTranslation(state.selectedLanguage, 'skip')}
        </button>
        
        <button onClick={handleAllow} className="btn-primary">
          {getTranslation(state.selectedLanguage, 'allow')}
        </button>
      </div>
    </div>
  );
};

export default PermissionRequest;