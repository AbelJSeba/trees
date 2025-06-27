import { MusicPlayerState } from './types';

interface iPodScreenProps {
  state: MusicPlayerState;
  onMenuItemClick?: (itemId: string) => void;
  onSongClick?: (songIndex: number) => void;
}

export function IPodScreen({ state, onMenuItemClick, onSongClick }: iPodScreenProps) {
  const currentTrack = state.tracks[state.currentTrackIndex];
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Theme-based styling
  const isDark = state.theme === 'dark';
  const screenBg = isDark ? '#121212' : 'white';
  const textColor = isDark ? 'text-gray-100' : 'text-black';
  const headerBg = isDark ? 'bg-gray-800' : 'bg-gray-100';
  const borderColor = isDark ? 'border-gray-600' : 'border-gray-300';
  const selectedBg = isDark ? 'bg-blue-600' : 'bg-blue-500';
  const hoverBg = isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200';
  const mutedTextColor = isDark ? 'text-gray-400' : 'text-gray-600';

  if (state.currentView === 'mainmenu') {
    // Main iPod menu
    const itemsPerScreen = 6;
    const totalItems = state.mainMenuItems.length;
    
    // Calculate scroll window based on selected index
    let startIndex = Math.max(0, state.selectedIndex - Math.floor(itemsPerScreen / 2));
    let endIndex = startIndex + itemsPerScreen;
    
    // Adjust if we're near the end of the list
    if (endIndex > totalItems) {
      endIndex = totalItems;
      startIndex = Math.max(0, endIndex - itemsPerScreen);
    }
    
    const visibleItems = state.mainMenuItems.slice(startIndex, endIndex);
    
    return (
      <div className={`w-full h-full font-mono text-sm select-none ${textColor}`} 
           style={{ backgroundColor: screenBg, pointerEvents: 'auto', zIndex: 10 }} 
           data-ipod-screen="true">
        {/* Header */}
        <div className={`flex justify-between items-center p-2 border-b ${borderColor} ${headerBg}`}>
          <span className="font-bold">iPod</span>
          <span className="text-xs">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
        
        {/* Menu Items */}
        <div className="p-2 space-y-1">
          {visibleItems.map((item, visibleIndex) => {
            const actualIndex = startIndex + visibleIndex;
            return (
              <div
                key={item.id}
                className={`px-2 py-1 rounded flex justify-between items-center cursor-pointer ${
                  actualIndex === state.selectedIndex ? `${selectedBg} text-white` : hoverBg
                }`}
                style={{ pointerEvents: 'auto' }}
                onClick={() => {
                  onMenuItemClick?.(item.id);
                }}
              >
                <span className="font-medium">{item.title}</span>
                {item.type === 'submenu' && <span>›</span>}
              </div>
            );
          })}
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-2 right-2 text-xs ${mutedTextColor}`}>
          {state.selectedIndex + 1} / {totalItems}
        </div>
      </div>
    );
  }

  if (state.currentView === 'settings') {
    // Settings menu
    const itemsPerScreen = 6;
    const totalItems = state.settingsMenuItems.length;
    
    let startIndex = Math.max(0, state.selectedIndex - Math.floor(itemsPerScreen / 2));
    let endIndex = startIndex + itemsPerScreen;
    
    if (endIndex > totalItems) {
      endIndex = totalItems;
      startIndex = Math.max(0, endIndex - itemsPerScreen);
    }
    
    const visibleItems = state.settingsMenuItems.slice(startIndex, endIndex);
    
    return (
      <div className={`w-full h-full font-mono text-sm select-none ${textColor}`} 
           style={{ backgroundColor: screenBg, pointerEvents: 'auto', zIndex: 10 }} 
           data-ipod-screen="true">
        {/* Header */}
        <div className={`flex justify-between items-center p-2 border-b ${borderColor} ${headerBg}`}>
          <span className="font-bold">⚙ Settings</span>
          <span className="text-xs">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
        
        {/* Settings Items */}
        <div className="p-2 space-y-1">
          {visibleItems.map((item, visibleIndex) => {
            const actualIndex = startIndex + visibleIndex;
            return (
              <div
                key={item.id}
                className={`px-2 py-1 rounded flex justify-between items-center cursor-pointer ${
                  actualIndex === state.selectedIndex ? `${selectedBg} text-white` : hoverBg
                }`}
                style={{ pointerEvents: 'auto' }}
                onClick={() => {
                  onMenuItemClick?.(item.id);
                }}
              >
                <span className="font-medium">{item.title}</span>
                {item.type === 'submenu' && <span>›</span>}
              </div>
            );
          })}
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-2 right-2 text-xs ${mutedTextColor}`}>
          {state.selectedIndex + 1} / {totalItems}
        </div>
      </div>
    );
  }

  if (state.currentView === 'theme-settings') {
    // Theme settings menu
    const itemsPerScreen = 6;
    const totalItems = state.themeMenuItems.length;
    
    let startIndex = Math.max(0, state.selectedIndex - Math.floor(itemsPerScreen / 2));
    let endIndex = startIndex + itemsPerScreen;
    
    if (endIndex > totalItems) {
      endIndex = totalItems;
      startIndex = Math.max(0, endIndex - itemsPerScreen);
    }
    
    const visibleItems = state.themeMenuItems.slice(startIndex, endIndex);
    
    return (
      <div className={`w-full h-full font-mono text-sm select-none ${textColor}`} 
           style={{ backgroundColor: screenBg, pointerEvents: 'auto', zIndex: 10 }} 
           data-ipod-screen="true">
        {/* Header */}
        <div className={`flex justify-between items-center p-2 border-b ${borderColor} ${headerBg}`}>
          <span className="font-bold">🎨 Theme</span>
          <span className="text-xs">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
        
        {/* Theme Items */}
        <div className="p-2 space-y-1">
          {visibleItems.map((item, visibleIndex) => {
            const actualIndex = startIndex + visibleIndex;
            return (
              <div
                key={item.id}
                className={`px-2 py-1 rounded flex justify-between items-center cursor-pointer ${
                  actualIndex === state.selectedIndex ? `${selectedBg} text-white` : hoverBg
                }`}
                style={{ pointerEvents: 'auto' }}
                onClick={() => {
                  onMenuItemClick?.(item.id);
                }}
              >
                <span className="font-medium">{item.title}</span>
                <span>›</span>
              </div>
            );
          })}
        </div>
        
        {/* Scroll indicator - only show if more than one item */}
        {totalItems > 1 && (
          <div className={`absolute bottom-2 right-2 text-xs ${mutedTextColor}`}>
            {state.selectedIndex + 1} / {totalItems}
          </div>
        )}
      </div>
    );
  }

  if (state.currentView === 'musiclist') {
    // Calculate scrollable window - show 6 songs at a time
    const songsPerScreen = 6;
    const totalSongs = state.tracks.length;
    
    // Calculate scroll window based on selected index
    let startIndex = Math.max(0, state.selectedIndex - Math.floor(songsPerScreen / 2));
    let endIndex = startIndex + songsPerScreen;
    
    // Adjust if we're near the end of the list
    if (endIndex > totalSongs) {
      endIndex = totalSongs;
      startIndex = Math.max(0, endIndex - songsPerScreen);
    }
    
    const visibleTracks = state.tracks.slice(startIndex, endIndex);
    
    return (
      <div className={`w-full h-full font-mono text-sm select-none ${textColor}`} 
           style={{ backgroundColor: screenBg, pointerEvents: 'auto', zIndex: 10 }} 
           data-ipod-screen="true">
        {/* Header */}
        <div className={`flex justify-between items-center p-2 border-b ${borderColor} ${headerBg}`}>
          <span className="font-bold">♫ Music</span>
          <span className="text-xs">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
        
        {/* Song List */}
        <div className="p-2 space-y-1">
          {visibleTracks.map((track, visibleIndex) => {
            const actualIndex = startIndex + visibleIndex;
            return (
              <div
                key={track.id}
                className={`p-1 rounded cursor-pointer ${
                  actualIndex === state.selectedIndex ? `${selectedBg} text-white` : hoverBg
                }`}
                style={{ pointerEvents: 'auto' }}
                onClick={() => {
                  onSongClick?.(actualIndex);
                }}
              >
                <div className="font-medium truncate">{track.title}</div>
                <div className={`text-xs opacity-75 truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{track.artist}</div>
              </div>
            );
          })}
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-2 right-2 text-xs ${mutedTextColor}`}>
          {state.selectedIndex + 1} / {totalSongs}
        </div>
      </div>
    );
  }

  // Now Playing View
  return (
    <div className={`w-full h-full font-mono text-sm select-none ${textColor}`} 
         style={{ backgroundColor: screenBg, pointerEvents: 'auto', zIndex: 10 }} 
         data-ipod-screen="true">
      {/* Header */}
      <div className={`flex justify-between items-center p-2 border-b ${borderColor} ${headerBg}`}>
        <span className="font-bold">Now Playing</span>
        <span className="text-xs">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
      </div>
      
      {/* Content - moved up by 10px to fit within screen bounds */}
      <div className="p-3 flex flex-col items-center justify-center h-full" style={{ marginTop: '-10px' }}>
        {/* Album Art */}
        <div className={`w-16 h-16 rounded mb-3 flex items-center justify-center overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
          {currentTrack.coverUrl ? (
            <img 
              src={currentTrack.coverUrl} 
              alt={`${currentTrack.title} cover`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to music note if image fails to load
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'flex';
                }
              }}
            />
          ) : null}
          <span className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ display: currentTrack.coverUrl ? 'none' : 'flex' }}>♪</span>
        </div>
        
        {/* Song Info */}
        <div className="text-center mb-3">
          <div className={`font-medium truncate mb-1 ${textColor}`}>{currentTrack.title}</div>
          <div className={`text-xs truncate ${mutedTextColor}`}>{currentTrack.artist}</div>
          {currentTrack.album && (
            <div className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{currentTrack.album}</div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-[200px] mb-2">
          <div className={`flex justify-between text-xs mb-1 ${mutedTextColor}`}>
            <span>{formatTime(Math.floor(state.currentTime))}</span>
            <span>{formatTime(Math.floor((state.duration || currentTrack.duration) - state.currentTime))}</span>
          </div>
          <div className={`w-full rounded-full h-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ 
                width: state.duration > 0 
                  ? `${(state.currentTime / state.duration) * 100}%` 
                  : '0%' 
              }}
            />
          </div>
        </div>
        
        {/* Play Status */}
        <div className={`text-center text-xs ${mutedTextColor}`}>
          {state.isPlaying ? '▶ Playing' : '⏸ Paused'}
        </div>
      </div>
    </div>
  );
}
