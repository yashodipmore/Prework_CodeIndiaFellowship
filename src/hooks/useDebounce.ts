import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 * 
 * This hook demonstrates the concept of debouncing in the event loop.
 * It waits until the specified delay has passed after the last value change
 * before updating the debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes or the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
