export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  audioUrl?: string;
  coverUrl?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  type: 'submenu' | 'action' | 'setting';
}

export type Theme = 'light' | 'dark';

export type ViewType = 'mainmenu' | 'musiclist' | 'nowplaying' | 'settings' | 'theme-settings';

export interface MusicPlayerState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentView: ViewType;
  selectedIndex: number;
  scrollOffset: number;
  mainMenuItems: MenuItem[];
  settingsMenuItems: MenuItem[];
  themeMenuItems: MenuItem[];
  currentTime: number;
  duration: number;
  theme: Theme;
  navigationStack: ViewType[]; // For back navigation
}

export interface TouchZone {
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
}
