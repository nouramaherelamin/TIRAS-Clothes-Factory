import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * Drop-in replacement for useState that persists to localStorage.
 * Keeps the admin dashboard state alive across page refreshes.
 * 
 * @param {string} key  - localStorage key
 * @param {*} initial   - initial value (used only if nothing is in storage)
 * @returns [value, setValue] — same API as useState
 */
const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage errors (quota exceeded, private mode, etc.)
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
