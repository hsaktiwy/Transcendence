import React, { createContext, useContext, useState } from 'react';

// 1) Create the context object
const UIQualityContext = createContext();

// 2) Export a custom hook to access the context
export function useUIQuality() {
  return useContext(UIQualityContext);
}

// 3) Create a provider component
export function UIQualityProvider({ children }) {
  // We'll store 1, 2, or 3 to represent different "quality" levels
  const [qualityLevel, setQualityLevel] = useState(1);

  return (
    <UIQualityContext.Provider value={{ qualityLevel, setQualityLevel }}>
      {children}
    </UIQualityContext.Provider>
  );
}
