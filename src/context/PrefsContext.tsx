import React, { createContext, useContext, useState } from 'react';
import { MealPlanPreferences } from '../types';

interface PrefsContextType {
  preferences: MealPlanPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<MealPlanPreferences>>;
}

const PrefsContext = createContext<PrefsContextType | null>(null);

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<MealPlanPreferences>({
    duration: 7,
    servings: 2,
    goal: '',
    dietaryRestrictions: [],
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    cookingTime: '',
    skillLevel: '',
  });

  return (
    <PrefsContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const context = useContext(PrefsContext);
  if (!context) {
    throw new Error('usePrefs must be used within a PrefsProvider');
  }
  return context;
}
