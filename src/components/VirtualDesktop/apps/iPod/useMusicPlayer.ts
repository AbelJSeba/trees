import { useState, useCallback, useRef, useEffect } from 'react';
import { Track, MusicPlayerState, MenuItem } from './types';

const sampleTracks: Track[] = [
  { 
    id: '1', 
    title: 'Bailando', 
    artist: 'abeljs', 
    album: 'Me & AI',
    duration: 195,
    audioUrl: '/audio/Bailando.mp3',
    coverUrl: '/audio/covers/Bailando.jpg'
  },
  { 
    id: '2', 
    title: 'Burnonit', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 210,
    audioUrl: '/audio/Burnonit.mp3',
    coverUrl: '/audio/covers/Burnonit.jpg'
  },
  { 
    id: '3', 
    title: 'Carry on', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 225,
    audioUrl: '/audio/Carry on.mp3',
    coverUrl: '/audio/covers/Carry on.jpg'
  },
  { 
    id: '4', 
    title: 'Final Lie', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 180,
    audioUrl: '/audio/Final Lie.mp3',
    coverUrl: '/audio/covers/Final Lie.jpg'
  },
  { 
    id: '5', 
    title: 'LoveSong', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 200,
    audioUrl: '/audio/LoveSong.mp3',
    coverUrl: '/audio/covers/LoveSong.jpg'
  },
  { 
    id: '6', 
    title: 'Mamma', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 165,
    audioUrl: '/audio/Mamma.mp3',
    coverUrl: '/audio/covers/Mamma.jpg'
  },
  { 
    id: '7', 
    title: 'SubeyBaja', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 190,
    audioUrl: '/audio/SubeyBaja.mp3',
    coverUrl: '/audio/covers/SubeyBaja.jpg'
  },
  { 
    id: '8', 
    title: 'Tantas Vueltas', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 215,
    audioUrl: '/audio/Tantas Vueltas.mp3',
    coverUrl: '/audio/covers/Tantas Vueltas.jpg'
  },
  { 
    id: '9', 
    title: 'The Last Battle', 
    artist: 'abeljs', 
    album: 'Me & AI', 
    duration: 240,
    audioUrl: '/audio/The Last Battle.mp3',
    coverUrl: '/audio/covers/The Last Battle.jpg'
  },
];

const mainMenuItems: MenuItem[] = [
  { id: 'music', title: 'Music', type: 'submenu' },
  { id: 'extras', title: 'Extras', type: 'submenu' },
  { id: 'settings', title: 'Settings', type: 'submenu' },
  { id: 'shuffle', title: 'Shuffle Songs', type: 'action' },
  { id: 'backlight', title: 'Backlight', type: 'setting' },
];

const settingsMenuItems: MenuItem[] = [
  { id: 'theme', title: 'Theme', type: 'submenu' },
  { id: 'about', title: 'About', type: 'action' },
  { id: 'reset', title: 'Reset Settings', type: 'action' },
];

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicPlayerState>({
    tracks: sampleTracks,
    currentTrackIndex: 0,
    isPlaying: false,
    currentView: 'mainmenu',
    selectedIndex: 0,
    scrollOffset: 0,
    mainMenuItems: mainMenuItems,
    settingsMenuItems: settingsMenuItems,
    themeMenuItems: [], // Will be dynamically generated based on current theme
    currentTime: 0,
    duration: 0,
    theme: 'light',
    navigationStack: [],
  });

  const [albumArt, setAlbumArt] = useState<string | null>(null);

  // Generate theme menu items based on current theme (show only the opposite)
  const getThemeMenuItems = useCallback((currentTheme: 'light' | 'dark') => {
    if (currentTheme === 'light') {
      return [{ id: 'dark', title: 'Dark', type: 'setting' as const }];
    } else {
      return [{ id: 'light', title: 'Light', type: 'setting' as const }];
    }
  }, []);

  // Update theme menu items whenever theme changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      themeMenuItems: getThemeMenuItems(prev.theme)
    }));
  }, [state.theme, getThemeMenuItems]);

  // Function to extract album art from MP3 file
  const extractAlbumArt = useCallback(async (audioUrl: string) => {
    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      
      // For now, we'll rely on the audio element's built-in metadata
      // and try to get the artwork from MediaMetadata API if available
      if ('mediaSession' in navigator && audioRef.current) {
        audioRef.current.addEventListener('loadedmetadata', () => {
          // Try to get artwork from the audio element
          if (audioRef.current && audioRef.current.src === audioUrl) {
            // Check if the browser can extract artwork automatically
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Since direct MP3 metadata extraction is complex in browser,
            // we'll implement a fallback approach using a video element
            // to potentially capture any embedded artwork
            const video = document.createElement('video');
            video.src = audioUrl;
            video.preload = 'metadata';
            
            video.addEventListener('loadedmetadata', () => {
              if (video.videoWidth > 0 && video.videoHeight > 0) {
                // If there's video data (could be album art), capture it
                canvas.width = 64;
                canvas.height = 64;
                ctx?.drawImage(video, 0, 0, 64, 64);
                const dataUrl = canvas.toDataURL();
                setAlbumArt(dataUrl);
              }
            });
          }
        });
      }
    } catch (error) {
      console.log('Could not extract album art:', error);
      setAlbumArt(null);
    }
  }, []);

  // Create audio element if it doesn't exist
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.7; // Set default volume
      
      // Handle audio events
      audioRef.current.addEventListener('ended', () => {
        // Auto-advance to next track when current song ends
        setState(prev => {
          const nextIndex = prev.currentTrackIndex < prev.tracks.length - 1 
            ? prev.currentTrackIndex + 1 
            : 0; // Loop back to first track
          
          return {
            ...prev,
            currentTrackIndex: nextIndex,
            isPlaying: true,
          };
        });
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setState(prev => ({ ...prev, isPlaying: false }));
      });

      // Track audio progress
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setState(prev => ({
            ...prev,
            currentTime: audioRef.current!.currentTime,
            duration: audioRef.current!.duration || 0,
          }));
        }
      });

      // Update duration when metadata loads
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setState(prev => ({
            ...prev,
            duration: audioRef.current!.duration || 0,
            currentTime: 0,
          }));
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current) {
      const currentTrack = state.tracks[state.currentTrackIndex];
      audioRef.current.src = currentTrack.audioUrl || '';
      audioRef.current.load();
      
      if (state.isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setState(prev => ({ ...prev, isPlaying: false }));
        });
      }
    }
  }, [state.currentTrackIndex]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setState(prev => ({ ...prev, isPlaying: false }));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying]);

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

  const setSelectedIndex = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      selectedIndex: index,
    }));
  }, []);

  const scroll = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      let itemCount = 0;
      
      // Determine the current menu items based on view
      if (prev.currentView === 'mainmenu') {
        itemCount = prev.mainMenuItems.length;
      } else if (prev.currentView === 'musiclist') {
        itemCount = prev.tracks.length;
      } else if (prev.currentView === 'settings') {
        itemCount = prev.settingsMenuItems.length;
      } else if (prev.currentView === 'theme-settings') {
        itemCount = prev.themeMenuItems.length;
      } else {
        return prev; // No scrolling in other views
      }
      
      let newIndex;
      if (direction === 'up') {
        newIndex = prev.selectedIndex === 0 ? itemCount - 1 : prev.selectedIndex - 1;
      } else {
        newIndex = prev.selectedIndex === itemCount - 1 ? 0 : prev.selectedIndex + 1;
      }
      
      return { ...prev, selectedIndex: newIndex };
    });
  }, []);

  const goToMenu = useCallback(() => {
    setState(prev => {
      // Navigate back through the navigation stack
      if (prev.navigationStack.length > 0) {
        const previousView = prev.navigationStack[prev.navigationStack.length - 1];
        const newStack = prev.navigationStack.slice(0, -1);
        
        return {
          ...prev,
          currentView: previousView,
          navigationStack: newStack,
          selectedIndex: 0,
        };
      } else {
        // If no stack, go to main menu
        return {
          ...prev,
          currentView: 'mainmenu',
          selectedIndex: 0,
        };
      }
    });
  }, []);

  // Smart play/pause that can work globally when music is playing
  const smartPlayPause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const centerAction = useCallback(() => {
    setState(prev => {
      if (prev.currentView === 'mainmenu') {
        // Handle main menu selection
        const selectedItem = prev.mainMenuItems[prev.selectedIndex];
        if (selectedItem.id === 'music') {
          return {
            ...prev,
            currentView: 'musiclist',
            selectedIndex: 0,
            navigationStack: [...prev.navigationStack, 'mainmenu'],
          };
        } else if (selectedItem.id === 'settings') {
          return {
            ...prev,
            currentView: 'settings',
            selectedIndex: 0,
            navigationStack: [...prev.navigationStack, 'mainmenu'],
          };
        }
        // For other menu items, stay in main menu for now
        return prev;
      } else if (prev.currentView === 'settings') {
        // Handle settings menu selection
        const selectedItem = prev.settingsMenuItems[prev.selectedIndex];
        if (selectedItem.id === 'theme') {
          return {
            ...prev,
            currentView: 'theme-settings',
            selectedIndex: 0, // Always start at index 0 since there's only one option
            navigationStack: [...prev.navigationStack, 'settings'],
            themeMenuItems: getThemeMenuItems(prev.theme), // Update theme options
          };
        }
        // For other settings items, stay in settings for now
        return prev;
      } else if (prev.currentView === 'theme-settings') {
        // Handle theme selection - there's only one option (the opposite theme)
        const selectedItem = prev.themeMenuItems[prev.selectedIndex];
        const newTheme = selectedItem.id === 'dark' ? 'dark' : 'light';
        
        return {
          ...prev,
          theme: newTheme,
          themeMenuItems: getThemeMenuItems(newTheme), // Update for new theme
          // Go back to settings after theme selection
          currentView: 'settings',
          selectedIndex: 0,
          navigationStack: prev.navigationStack.slice(0, -1),
        };
      } else if (prev.currentView === 'musiclist') {
        // Select track and go to now playing
        return {
          ...prev,
          currentTrackIndex: prev.selectedIndex,
          currentView: 'nowplaying',
          navigationStack: [...prev.navigationStack, 'musiclist'],
        };
      } else {
        // Now playing view - toggle play/pause
        return {
          ...prev,
          isPlaying: !prev.isPlaying,
        };
      }
    });
  }, [getThemeMenuItems]);

  return {
    state,
    albumArt,
    actions: {
      selectTrack,
      togglePlayPause,
      previousTrack,
      nextTrack,
      scroll,
      goToMenu,
      centerAction,
      toggleTheme,
      setSelectedIndex,
    },
  };
}
