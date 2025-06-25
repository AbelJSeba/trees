export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  audioUrl?: string;
  coverUrl?: string;
}

export interface MusicPlayerState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentView: 'list' | 'nowplaying';
  selectedIndex: number;
  scrollOffset: number;
}

export interface TouchZone {
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
}