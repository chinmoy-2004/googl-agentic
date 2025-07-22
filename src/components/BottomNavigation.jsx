import React from 'react';
import { Leaf, Users, ShoppingBag, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext.jsx';
import { getTranslation } from '../utils/translations.js';

const BottomNavigation = ({ activeTab, onTabPress }) => {
  const context = useApp();
  const state = context?.state || { selectedLanguage: 'English' };
  
  const tabs = [
    { id: 'home', labelKey: 'yourCrops', icon: Leaf },
    { id: 'community', labelKey: 'community', icon: Users },
    { id: 'market', labelKey: 'market', icon: ShoppingBag },
    { id: 'profile', labelKey: 'you', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              className="flex-1 flex flex-col items-center py-2 px-1 touch-target"
              onClick={() => onTabPress(tab.id)}
            >
              <IconComponent 
                size={24} 
                className={`mb-1 ${isActive ? 'text-primary-500' : 'text-gray-400'}`}
              />
              <span className={`text-xs ${isActive ? 'text-primary-500 font-semibold' : 'text-gray-400'}`}>
                {getTranslation(state.selectedLanguage, tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;