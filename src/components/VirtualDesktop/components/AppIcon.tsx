import { motion } from 'framer-motion';
import { DesktopApp } from '../types';

interface AppIconProps {
  app: DesktopApp;
  isSelected: boolean;
  onSelect: () => void;
  onLaunch: () => void;
}

export function AppIcon({ app, isSelected, onSelect, onLaunch }: AppIconProps) {
  const handleDoubleClick = () => {
    onLaunch();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1 cursor-pointer select-none"
      style={{ left: app.x, top: app.y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`
          w-16 h-16 rounded-xl flex items-center justify-center text-4xl
          ${isSelected ? 'bg-blue-500/30 ring-2 ring-blue-500' : 'hover:bg-white/10'}
          transition-all duration-200
        `}
      >
        {app.icon.startsWith('/') ? (
          <img src={app.icon} alt={app.name} className="w-12 h-12" />
        ) : (
          app.icon
        )}
      </div>
      <span
        className={`
          text-xs text-white px-2 py-0.5 rounded max-w-[80px] text-center
          ${isSelected ? 'bg-blue-500' : 'bg-black/50'}
          transition-colors duration-200
        `}
      >
        {app.name}
      </span>
    </motion.div>
  );
}