import { useState, useCallback } from 'react';
import { Track, MusicPlayerState } from './types';

const sampleTracks: Track[] = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: 354 },
  { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482 },
  { id: '3', title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391 },
  { id: '4', title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: 183 },
  { id: '5', title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: 294 },
  { id: '6', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: 356 },
  { id: '7', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: 301 },
  { id: '8', title: 'Like a Rolling Stone', artist: 'Bob Dylan', album: 'Highway 61 Revisited', duration: 369 },
  { id: '9', title: 'Purple Haze', artist: 'Jimi Hendrix', album: 'Are You Experienced', duration: 170 },
  { id: '10', title: 'Hey Jude', artist: 'The Beatles', album: 'Hey Jude', duration: 431 },
];

export function useMusicPlayer() {
  const [state, setState] = useState<MusicPlayerState>({
    tracks: sampleTracks,
    currentTrackIndex: 0,
    isPlaying: false,
    currentView: 'list',
    selectedIndex: 0,
    scrollOffset: 0,
  });

  const selectTrack = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentTrackIndex: index,
      currentView: 'nowplaying',
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, []);

  const previousTrack = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentTrackIndex: Math.max(0, prev.currentTrackIndex - 1),
    }));
  }, []);

  const nextTrack = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentTrackIndex: Math.min(prev.tracks.length - 1, prev.currentTrackIndex + 1),
    }));
  }, []);

  const scroll = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      if (prev.currentView === 'list') {
        const newIndex = direction === 'up' 
          ? Math.max(0, prev.selectedIndex - 1)
          : Math.min(prev.tracks.length - 1, prev.selectedIndex + 1);
        
        return {
          ...prev,
          selectedIndex: newIndex,
        };
      }
      return prev;
    });
  }, []);

  const goToMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: 'list',
    }));
  }, []);

  const centerAction = useCallback(() => {
    setState(prev => {
      if (prev.currentView === 'list') {
        return {
          ...prev,
          currentTrackIndex: prev.selectedIndex,
          currentView: 'nowplaying',
        };
      } else {
        return {
          ...prev,
          isPlaying: !prev.isPlaying,
        };
      }
    });
  }, []);

  return {
    state,
    actions: {
      selectTrack,
      togglePlayPause,
      previousTrack,
      nextTrack,
      scroll,
      goToMenu,
      centerAction,
    },
  };
}