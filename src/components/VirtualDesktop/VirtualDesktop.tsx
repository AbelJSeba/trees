import { useState } from 'react';
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

  return (
    <div className={`relative w-full ${headerVisible ? 'h-[calc(100vh-64px)] mt-16' : 'h-screen'} overflow-hidden bg-gray-900`}>
      {/* Menu Bar */}
      <MenuBar 
        activeApp={windows.find(w => w.isActive)?.appType || null}
        onWallpaperChange={setWallpaper}
        onPowerAction={handlePowerAction}
        onToggleHeader={onToggleHeader}
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