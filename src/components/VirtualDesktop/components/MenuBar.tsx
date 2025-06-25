import { useState, useEffect } from 'react';
import { AppType } from '../types';
import { AboutThisMac } from './AboutThisMac';

interface MenuBarProps {
  activeApp: AppType | null;
  onWallpaperChange: (wallpaper: string) => void;
  onPowerAction: (action: 'sleep' | 'restart' | 'shutdown') => void;
  onToggleHeader?: () => void;
}

export function MenuBar({ activeApp, onWallpaperChange, onPowerAction, onToggleHeader }: MenuBarProps) {
  const [time, setTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAboutMac, setShowAboutMac] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getAppName = () => {
    if (!activeApp) return 'Finder';
    switch (activeApp) {
      case 'iPod': return 'iPod';
      case 'PhotoBooth': return 'Photos';
      case 'Files': return 'Projects';
      default: return 'Finder';
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[39px] bg-black/80 backdrop-blur-xl flex items-center justify-between px-3 text-white text-sm z-[9999]">
      {/* Left side - Apple menu and app name */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors flex items-center"
            onClick={() => setShowAppleMenu(!showAppleMenu)}
          >
            <img src="/icons/apple-logo.svg" alt="Apple" className="w-4 h-4" />
          </button>
          
          {showAppleMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white/90 backdrop-blur-xl rounded-lg shadow-lg py-1 min-w-[200px] text-black">
              <button 
                className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  setShowAboutMac(true);
                  setShowAppleMenu(false);
                }}
              >
                About This Device
              </button>
              <div className="h-px bg-gray-200 my-1" />
              <button className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors">
                System Preferences...
              </button>
              <button 
                className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  const wallpapers = [
                    'linear-gradient(to bottom, #1e3c72, #2a5298)',
                    'linear-gradient(to bottom, #ff7e5f, #feb47b)',
                    'linear-gradient(to bottom, #6a11cb, #2575fc)',
                    'linear-gradient(to bottom, #f093fb, #f5576c)',
                  ];
                  const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
                  onWallpaperChange(randomWallpaper);
                  setShowAppleMenu(false);
                }}
              >
                Change Wallpaper
              </button>
              <div className="h-px bg-gray-200 my-1" />
              <button 
                className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  onPowerAction('sleep');
                  setShowAppleMenu(false);
                }}
              >
                Sleep
              </button>
              <button 
                className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  onPowerAction('restart');
                  setShowAppleMenu(false);
                }}
              >
                Restart...
              </button>
              <button 
                className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  onPowerAction('shutdown');
                  setShowAppleMenu(false);
                }}
              >
                Shut Down...
              </button>
            </div>
          )}
        </div>
        
        <span className="font-semibold">{getAppName()}</span>
        
        <div className="flex items-center gap-3 justify-center">
          {onToggleHeader && (
            <button 
              className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
              onClick={onToggleHeader}
            >
              Menu Bar
            </button>
          )}
          <button className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors">
            File
          </button>
          <button className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors">
            Edit
          </button>
          <button className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors">
            View
          </button>
          <button className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors">
            Window
          </button>
          <button className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors">
            Help
          </button>
        </div>
      </div>

      {/* Right side - System icons and time */}
      <div className="flex items-center gap-3">
        <button 
          className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <span className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors cursor-default">
          {formatTime(time)}
        </span>
      </div>
      </div>

      {/* About This Mac Modal */}
      {showAboutMac && (
        <AboutThisMac onClose={() => setShowAboutMac(false)} />
      )}
    </>
  );
}
