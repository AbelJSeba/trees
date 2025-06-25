import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    { label: 'New Folder', action: () => console.log('New folder') },
    { label: 'Get Info', action: () => console.log('Get info') },
    { label: 'Change Desktop Background...', action: () => console.log('Change background') },
    { divider: true },
    { label: 'Sort By', action: () => console.log('Sort by') },
    { label: 'Clean Up', action: () => console.log('Clean up') },
  ];

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="absolute z-50 bg-white/90 backdrop-blur-xl rounded-lg shadow-lg py-1 min-w-[200px]"
        style={{
          left: x,
          top: y,
        }}
      >
        {menuItems.map((item, index) => (
          item.divider ? (
            <div key={index} className="h-px bg-gray-200 my-1" />
          ) : (
            <button
              key={index}
              className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => {
                item.action();
                onClose();
              }}
            >
              {item.label}
            </button>
          )
        ))}
      </motion.div>
    </AnimatePresence>
  );
}