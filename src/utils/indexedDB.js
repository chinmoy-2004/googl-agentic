// IndexedDB utilities for offline storage

let db = null;

export const openDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open('ProjectKisanDB', 1);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Create object stores
      if (!db.objectStoreNames.contains('pendingUploads')) {
        const uploadStore = db.createObjectStore('pendingUploads', { keyPath: 'id' });
        uploadStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      if (!db.objectStoreNames.contains('cropData')) {
        const cropStore = db.createObjectStore('cropData', { keyPath: 'id' });
        cropStore.createIndex('cropType', 'cropType', { unique: false });
      }

      if (!db.objectStoreNames.contains('marketPrices')) {
        const marketStore = db.createObjectStore('marketPrices', { keyPath: 'id' });
        marketStore.createIndex('crop', 'crop', { unique: false });
      }
    };
  });
};

export const saveToIndexedDB = async (storeName, data) => {
  try {
    const database = await openDB();
    const transaction = database.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.add(data);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
    throw error;
  }
};

export const getFromIndexedDB = async (storeName, key) => {
  try {
    const database = await openDB();
    const transaction = database.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error getting from IndexedDB:', error);
    throw error;
  }
};

export const getAllFromIndexedDB = async (storeName) => {
  try {
    const database = await openDB();
    const transaction = database.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error getting all from IndexedDB:', error);
    throw error;
  }
};

export const deleteFromIndexedDB = async (storeName, key) => {
  try {
    const database = await openDB();
    const transaction = database.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error deleting from IndexedDB:', error);
    throw error;
  }
};

export const clearIndexedDB = async (storeName) => {
  try {
    const database = await openDB();
    const transaction = database.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error clearing IndexedDB:', error);
    throw error;
  }
};