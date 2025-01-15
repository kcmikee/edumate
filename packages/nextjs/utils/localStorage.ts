export const getLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item as `0x${string}`) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};
