import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authenticateUser } from '../config/firebase';
import { openDB } from '../utils/indexedDB';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  selectedLanguage: 'English',
  selectedCrops: [],
  farmingType: '',
  onboardingCompleted: false,
  currentScreen: 'splash',
  loading: true,
  error: null,
  isOnline: navigator.onLine,
  pendingUploads: [],
  lastSync: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SET_LANGUAGE':
      return { ...state, selectedLanguage: action.payload };
    case 'SET_CROPS':
      return { ...state, selectedCrops: action.payload };
    case 'SET_FARMING_TYPE':
      return { ...state, farmingType: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingCompleted: true };
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.payload };
    case 'ADD_PENDING_UPLOAD':
      return { ...state, pendingUploads: [...state.pendingUploads, action.payload] };
    case 'REMOVE_PENDING_UPLOAD':
      return { 
        ...state, 
        pendingUploads: state.pendingUploads.filter(upload => upload.id !== action.payload) 
      };
    case 'SET_LAST_SYNC':
      return { ...state, lastSync: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    initializeApp();
    setupOfflineHandlers();
  }, []);

  const initializeApp = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Initialize IndexedDB
      await openDB();
      
      // Simulate splash screen delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Authenticate user
      const user = await authenticateUser();
      dispatch({ type: 'SET_USER', payload: user });
      
      // Check if onboarding is completed (would come from localStorage in real app)
      const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
      
      if (onboardingCompleted) {
        dispatch({ type: 'COMPLETE_ONBOARDING' });
        dispatch({ type: 'SET_SCREEN', payload: 'home' });
      } else {
        dispatch({ type: 'SET_SCREEN', payload: 'onboarding' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_SCREEN', payload: 'onboarding' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setupOfflineHandlers = () => {
    const handleOnline = () => {
      dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
      // Sync pending uploads when back online
      syncPendingUploads();
    };

    const handleOffline = () => {
      dispatch({ type: 'SET_ONLINE_STATUS', payload: false });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  };

  const syncPendingUploads = async () => {
    // Implementation for syncing pending uploads
    console.log('Syncing pending uploads...');
    dispatch({ type: 'SET_LAST_SYNC', payload: new Date().toISOString() });
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};