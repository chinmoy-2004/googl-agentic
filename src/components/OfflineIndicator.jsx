import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const OfflineIndicator = () => {
  const { state } = useApp();

  if (state.isOnline) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-white px-4 py-2 flex items-center justify-center text-sm font-medium">
      <WifiOff size={16} className="mr-2" />
      You're offline. Changes will sync when connection is restored.
    </div>
  );
};

export default OfflineIndicator;