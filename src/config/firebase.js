// Demo Firebase configuration for web development
const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Mock authentication for demo purposes
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

export { firebaseConfig };