import { useState } from 'react';
import { useEvent } from 'react-use';
import localSignalStorage from 'local-signal-storage';
export const useLocalSignalStorage = (key, initialValue) => {
  const [value, setStoredValue] = useState(() => {
    try {
      const item = localSignalStorage.getItem(key);
      return item && JSON.parse(item) || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = update => {
    try {
      const newValue = update instanceof Function && update(value) || update;
      setStoredValue(newValue);
      localSignalStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
  };

  localSignalStorage.registerEventProxy();

  const onLocalSignalStorageUpdate = () => {
    const storageValue = localSignalStorage.getItem(key);

    if (storageValue !== value) {
      setStoredValue(storageValue);
    }

    ;
  };

  useEvent('localSignalStorage', onLocalSignalStorageUpdate);

  const remove = () => localSignalStorage.remove(key);

  return [value, setValue, remove];
};