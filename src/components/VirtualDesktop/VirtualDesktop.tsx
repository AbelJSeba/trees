import { useState, useEffect, useRef, useCallback } from 'react';
import { Desktop } from './components/Desktop';
import { MenuBar } from './components/MenuBar';
import { WindowFrame } from './components/WindowFrame';
import { PowerStates } from './components/PowerStates';
import { useWindowManager } from './hooks/useWindowManager';
import { useDesktopState } from './hooks/useDesktopState';
import { AppType, WindowState } from './types';

interface VirtualDesktopProps {
  onToggleHeader?: () => void;
  headerVisible?: boolean;
}

export function VirtualDesktop({ onToggleHeader, headerVisible = false }: VirtualDesktopProps) {
  const { wallpaper, setWallpaper } = useDesktopState();
  const { windows, openWindow, closeWindow, focusWindow, updateWindowState } = useWindowManager();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [powerState, setPowerState] = useState<'sleep' | 'restart' | 'shutdown' | null>(null);
  
  // Refs for conditional scroll lockdown
  const desktopRef = useRef<HTMLDivElement>(null);

  const handleAppLaunch = (appType: AppType) => {
    openWindow(appType);
    setSelectedApp(null);
  };

  const handleDesktopClick = () => {
    setSelectedApp(null);
  };

  const handlePowerAction = (action: 'sleep' | 'restart' | 'shutdown') => {
    setPowerState(action);
  };

  const handleWakeUp = () => {
    setPowerState(null);
  };

  const handleRestartComplete = () => {
    setPowerState(null);
    // Clear all windows on restart
    windows.forEach(window => closeWindow(window.id));
  };

  const handlePowerOn = () => {
    setPowerState(null);
  };

  // Conditional scroll lockdown - only prevent if event hasn't been handled by children
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Check if the event target is within an interactive application
    const target = e.target as HTMLElement;
    const isWithinWindow = target.closest('[data-window-frame]');
    const isWithinInteractiveApp = target.closest('[data-interactive-app]');
    
    // If the event is within an interactive app/window, let it handle the scrolling
    if (isWithinWindow || isWithinInteractiveApp) {
      return; // Don't prevent, let the app handle it
    }
    
    // Otherwise, prevent desktop-level scrolling
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const isWithinWindow = target.closest('[data-window-frame]');
    const isWithinInteractiveApp = target.closest('[data-interactive-app]');
    
    if (isWithinWindow || isWithinInteractiveApp) {
      return; // Let the app handle touch events
    }
    
    // Only prevent multi-touch gestures that could cause zooming/scrolling
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const isWithinWindow = target.closest('[data-window-frame]');
    const isWithinInteractiveApp = target.closest('[data-interactive-app]');
    
    if (isWithinWindow || isWithinInteractiveApp) {
      return; // Let the app handle touch movement
    }
    
    // Prevent desktop scrolling from touch gestures
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const isWithinWindow = target.closest('[data-window-frame]');
    const isWithinInteractiveApp = target.closest('[data-interactive-app]');
    
    if (isWithinWindow || isWithinInteractiveApp) {
      return; // Let the app handle touch end
    }
    
    e.preventDefault();
  }, []);

  // Set up non-passive event listeners for desktop-level scroll control
  useEffect(() => {
    const container = desktopRef.current;
    if (!container) return;

    // Handle wheel events that reach the desktop level
    const handleWheelNative = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const isWithinWindow = target.closest('[data-window-frame]');
      const isWithinInteractiveApp = target.closest('[data-interactive-app]');
      
      // If within an interactive component, don't interfere
      if (isWithinWindow || isWithinInteractiveApp) {
        return;
      }
      
      // Prevent desktop-level scrolling
      e.preventDefault();
      e.stopPropagation();
    };

    const handleTouchMoveNative = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isWithinWindow = target.closest('[data-window-frame]');
      const isWithinInteractiveApp = target.closest('[data-interactive-app]');
      
      // If within an interactive component, don't interfere
      if (isWithinWindow || isWithinInteractiveApp) {
        return;
      }
      
      // Prevent desktop scrolling
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if focus is within an interactive application
      const activeElement = document.activeElement;
      const isWithinWindow = activeElement?.closest('[data-window-frame]');
      const isWithinInteractiveApp = activeElement?.closest('[data-interactive-app]');
      
      if (isWithinWindow || isWithinInteractiveApp) {
        return; // Let the app handle keyboard events
      }
      
      // Prevent arrow keys, page up/down, space, home, end from scrolling desktop
      const scrollKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'PageUp', 'PageDown', 'Home', 'End', 'Space'
      ];
      
      if (scrollKeys.includes(e.code)) {
        e.preventDefault();
      }
    };

    // Add listeners with lower priority than applications
    container.addEventListener('wheel', handleWheelNative, { passive: false });
    container.addEventListener('touchmove', handleTouchMoveNative, { passive: false });
    document.addEventListener('keydown', handleKeyDown, { passive: false });

    // Prevent body scroll while virtual desktop is active
    document.body.style.overflow = 'hidden';

    return () => {
      container.removeEventListener('wheel', handleWheelNative);
      container.removeEventListener('touchmove', handleTouchMoveNative);
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore body scroll when leaving virtual desktop
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      ref={desktopRef}
      className="relative w-full h-screen overflow-hidden bg-gray-900 select-none" 
      style={{ paddingTop: headerVisible ? '32px' : '0' }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop Background - Low priority scroll capture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Menu Bar */}
      <MenuBar 
        activeApp={windows.find(w => w.isActive)?.appType || null}
        onWallpaperChange={setWallpaper}
        onPowerAction={handlePowerAction}
        onToggleHeader={onToggleHeader}
        headerVisible={headerVisible}
      />
      
      {/* Desktop */}
      <Desktop
        wallpaper={wallpaper}
        onAppLaunch={handleAppLaunch}
        onDesktopClick={handleDesktopClick}
        selectedApp={selectedApp}
        onAppSelect={setSelectedApp}
      />
      
      {/* Windows */}
      {windows.map((window) => (
        <WindowFrame
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onUpdateState={(state: Partial<WindowState>) => updateWindowState(window.id, state)}
        />
      ))}

      {/* Power States */}
      <PowerStates
        mode={powerState}
        onWakeUp={handleWakeUp}
        onRestartComplete={handleRestartComplete}
        onPowerOn={handlePowerOn}
      />
    </div>
  );
}
