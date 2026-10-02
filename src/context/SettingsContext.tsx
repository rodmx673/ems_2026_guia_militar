import React, { createContext, useContext, useState, useEffect } from 'react';

export type EntryMode = 'direct' | 'doctrinal';

export interface AppSettings {
  hideOnboarding: boolean;
  entryMode: EntryMode;
  autoPlayTts: boolean;
  speechRate: number;
}

const STORAGE_KEY = 'ems_2026_settings_v1';

const DEFAULT_SETTINGS: AppSettings = {
  hideOnboarding: false,
  entryMode: 'doctrinal',
  autoPlayTts: true,
  speechRate: 1
};

interface SettingsContextType {
  settings: AppSettings;
  showOnboarding: boolean;
  confirmOnboarding: (entryMode: EntryMode, autoPlayTts: boolean, hideOnboarding: boolean) => void;
  setAutoPlayTts: (value: boolean) => void;
  setSpeechRate: (value: number) => void;
  reopenOnboarding: () => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppSettings>;
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {
      // fallback to defaults
    }
    return DEFAULT_SETTINGS;
  });

  // Session-scoped: the onboarding modal shows on every launch until the user
  // ticks "No volver a mostrar".
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppSettings>;
        return !(parsed.hideOnboarding ?? false);
      }
    } catch {
      return true;
    }
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving EMS settings', e);
    }
  }, [settings]);

  const confirmOnboarding = (entryMode: EntryMode, autoPlayTts: boolean, hideOnboarding: boolean) => {
    setSettings(prev => ({ ...prev, entryMode, autoPlayTts, hideOnboarding }));
    setShowOnboarding(false);
  };

  const setAutoPlayTts = (value: boolean) => {
    setSettings(prev => ({ ...prev, autoPlayTts: value }));
  };

  const setSpeechRate = (value: number) => {
    setSettings(prev => ({ ...prev, speechRate: value }));
  };

  const reopenOnboarding = () => {
    setSettings(prev => ({ ...prev, hideOnboarding: false }));
    setShowOnboarding(true);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setShowOnboarding(true);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        showOnboarding,
        confirmOnboarding,
        setAutoPlayTts,
        setSpeechRate,
        reopenOnboarding,
        resetSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};