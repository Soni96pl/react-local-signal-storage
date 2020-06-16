import { useState } from 'react';
import localSignalStorage from 'local-signal-storage';


export const useLocalSignalStorage = (key, initialValue) => {
  const [value, setStoredValue] = useState(() => {
    try {
      const item = localSignalStorage.getItem(key);
      return (item && JSON.parse(item)) || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (update) => {
    try {
      const newValue = (update instanceof Function && update(value)) || update;
      setStoredValue(newValue);
      localSignalStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
  };

  localSignalStorage.registerEventProxy();

  window.addEventListener('localSignalStorage', () => {
    const storageValue = localSignalStorage.getItem(key);
    if (storageValue !== value) {
      setStoredValue(storageValue);
    };
  });

  const remove = () => localSignalStorage.remove(key);

  return [value, setValue, remove];
};
