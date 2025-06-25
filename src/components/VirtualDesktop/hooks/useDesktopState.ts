import { useState, useEffect } from 'react';

const DEFAULT_WALLPAPER = 'linear-gradient(to bottom, #1e3c72, #2a5298)';
const STORAGE_KEY = 'virtual-desktop-state';

interface DesktopPreferences {
  wallpaper: string;
}

export function useDesktopState() {
  const [wallpaper, setWallpaper] = useState(DEFAULT_WALLPAPER);

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const preferences: DesktopPreferences = JSON.parse(stored);
        if (preferences.wallpaper) {
          setWallpaper(preferences.wallpaper);
        }
      } catch (e) {
        console.error('Failed to load desktop preferences:', e);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const preferences: DesktopPreferences = { wallpaper };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [wallpaper]);

  return {
    wallpaper,
    setWallpaper,
  };
}