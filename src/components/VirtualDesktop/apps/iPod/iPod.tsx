import { useEffect, useRef, useCallback } from 'react';
import { useMusicPlayer } from './useMusicPlayer';
import { IPodControls } from './iPodControls';
import { IPodScreen } from './iPodScreen';

export function iPod() {
  const { state, actions } = useMusicPlayer();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Choose SVG based on theme
  const ipodSvg = state.theme === 'dark' ? '/icons/blacipod.svg' : '/icons/Ipod.svg';

  // Controlled wheel scrolling with proper sensitivity and debouncing
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Only handle wheel events for scrollable views
    const scrollableViews = ['mainmenu', 'musiclist', 'settings', 'theme-settings'];
    if (!scrollableViews.includes(state.currentView)) {
      return;
    }

    // Prevent event from bubbling up to desktop
    e.preventDefault();
    e.stopPropagation();
    
    // Add debouncing to prevent over-scrolling
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      // Only scroll if deltaY is significant enough
      if (Math.abs(e.deltaY) > 8) {
        if (e.deltaY > 0) {
          actions.scroll('down');
        } else {
          actions.scroll('up');
        }
      }
    }, 100); // 100ms debounce to slow down scrolling
  }, [state.currentView, actions]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative w-[377px] h-[626px] select-none" 
      data-interactive-app="true"
      onWheel={handleWheel}
    >
      {/* iPod SVG Background - switches based on theme */}
      <img 
        src={ipodSvg}
        alt="iPod" 
        className="absolute inset-0 w-full h-full select-none"
        draggable={false}
      />
      
      {/* Screen Overlay - positioned relative to iPod */}
      <div 
        className="absolute rounded-[5px] overflow-hidden"
        style={{
          top: '27px',
          left: '33px', 
          width: '312px',
          height: '236px',
          zIndex: 25, // Higher than controls
          pointerEvents: 'none', // Let clicks pass through the container
        }}
      >
        <IPodScreen 
          state={state} 
          onMenuItemClick={(itemId) => {
            // Handle clicks differently based on current view
            let menuItems;
            if (state.currentView === 'mainmenu') {
              menuItems = state.mainMenuItems;
            } else if (state.currentView === 'settings') {
              menuItems = state.settingsMenuItems;
            } else if (state.currentView === 'theme-settings') {
              menuItems = state.themeMenuItems;
            } else {
              return; // No menu items in other views
            }
            
            // Find and select the clicked item, then trigger centerAction
            const itemIndex = menuItems.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
              actions.setSelectedIndex(itemIndex);
              // Small delay to ensure state updates before navigation
              setTimeout(() => {
                actions.centerAction();
              }, 10);
            }
          }}
          onSongClick={(songIndex) => {
            // Select the song and start playing automatically
            actions.selectTrack(songIndex);
            // Start playing if not already playing
            if (!state.isPlaying) {
              actions.togglePlayPause();
            }
          }}
        />
      </div>
      
      {/* Interactive Controls Overlay */}
      <IPodControls
        state={state}
        onCenterPress={actions.centerAction}
        onMenuPress={actions.goToMenu}
        onPreviousPress={actions.previousTrack}
        onNextPress={actions.nextTrack}
        onScroll={actions.scroll}
        onTogglePlayPause={actions.togglePlayPause}
      />
    </div>
  );
}
