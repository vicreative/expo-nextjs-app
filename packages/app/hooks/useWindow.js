import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

function useWindow() {
  const [windowObject, setWindowObject] = useState();

  useEffect(() => {
    if (Platform.OS === 'web') {
      setWindowObject(window);
    }
  }, []);

  return windowObject;
}

export default useWindow;
