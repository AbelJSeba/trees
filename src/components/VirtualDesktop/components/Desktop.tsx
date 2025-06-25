import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AppIcon } from './AppIcon';
import { ContextMenu } from './ContextMenu';
import { DESKTOP_APPS, AppType } from '../types';

interface DesktopProps {
  wallpaper: string;
  onAppLaunch: (appType: AppType) => void;
  onDesktopClick: () => void;
  selectedApp: string | null;
  onAppSelect: (appId: string | null) => void;
}

export function Desktop({ wallpaper, onAppLaunch, onDesktopClick, selectedApp, onAppSelect }: DesktopProps) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === desktopRef.current) {
      onDesktopClick();
      setContextMenu(null);
    }
  };

  const wallpaperStyle: React.CSSProperties = wallpaper.startsWith('http') || wallpaper.startsWith('/') 
    ? {
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {
        background: wallpaper,
      };

  return (
    <div
      ref={desktopRef}
      className="absolute top-[39px] left-0 right-0 bottom-0"
      style={wallpaperStyle}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className="relative h-full p-4">
        {DESKTOP_APPS.map((app) => (
          <AppIcon
            key={app.id}
            app={app}
            isSelected={selectedApp === app.id}
            onSelect={() => onAppSelect(app.id)}
            onLaunch={() => onAppLaunch(app.type)}
          />
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}