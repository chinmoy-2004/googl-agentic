// Mock Firebase configuration for demo purposes
// This prevents authentication errors while maintaining functionality
export const authenticateUser = async () => {
  try {
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a mock user for demo purposes
    return {
      uid: 'demo-user-' + Math.random().toString(36).substr(2, 9),
      isAnonymous: true,
      email: null
    };
  } catch (error) {
    console.error('Authentication error:', error);
    // Return a fallback user
    return {
      uid: 'demo-user-fallback',
      isAnonymous: true,
      email: null
    };
  }
};

// Mock Firebase config - not actually used to prevent auth errors
export const firebaseConfig = null;