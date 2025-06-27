import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WindowState } from '../types';
import { iPod } from '../apps/iPod/iPod';
import { PhotoBooth } from '../apps/PhotoBooth/PhotoBooth';
import { Files } from '../apps/Files/Files';

interface WindowFrameProps {
  window: WindowState;
  onClose: () => void;
  onFocus: () => void;
  onUpdateState: (state: Partial<WindowState>) => void;
}

const APP_COMPONENTS = {
  iPod: iPod,
  PhotoBooth: PhotoBooth,
  Files: Files,
};

export function WindowFrame({ window, onClose, onFocus, onUpdateState }: WindowFrameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-titlebar')) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - window.x,
        y: e.clientY - window.y,
      });
      onFocus();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onUpdateState({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart]);

  const AppComponent = APP_COMPONENTS[window.appType];

  if (window.isMinimized) return null;

  // iPod should have no window chrome, just floating controls
  if (window.appType === 'iPod') {
    return (
      <motion.div
        ref={windowRef}
        className="absolute select-none"
        data-window-frame="true"
        data-interactive-app="true"
        style={{
          left: window.x,
          top: window.y,
          width: window.width,
          height: window.height,
          zIndex: window.zIndex,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Floating Controls for iPod - positioned above top left corner */}
        <div className="absolute -top-8 left-4 flex gap-2 z-10">
          <button
            className="w-6 h-6 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center"
            onClick={onClose}
          >
            <span className="text-white text-xs leading-none">×</span>
          </button>
          <button
            className="w-6 h-6 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors shadow-lg flex items-center justify-center"
            onClick={() => onUpdateState({ isMinimized: true })}
          >
            <span className="text-white text-xs leading-none">-</span>
          </button>
        </div>
        
        {/* iPod Content - No background or borders */}
        <AppComponent />
        
        {/* Draggable areas for iPod - larger areas that don't interfere with controls */}
        
        {/* Top area above screen - safe to drag */}
        <div 
          className="absolute pointer-events-auto cursor-move"
          style={{
            top: '0px',
            left: '0px', 
            right: '0px',
            height: '27px',
          }}
          onMouseDown={handleMouseDown}
        />
        
        {/* Left side - avoiding screen and wheel areas */}
        <div 
          className="absolute pointer-events-auto cursor-move"
          style={{
            top: '27px',
            left: '0px', 
            width: '33px',
            bottom: '290px',
          }}
          onMouseDown={handleMouseDown}
        />
        
        {/* Right side - avoiding screen and wheel areas */}
        <div 
          className="absolute pointer-events-auto cursor-move"
          style={{
            top: '27px',
            right: '0px', 
            width: '33px',
            bottom: '290px',
          }}
          onMouseDown={handleMouseDown}
        />
        
        {/* Bottom area below wheel - safe to drag */}
        <div 
          className="absolute pointer-events-auto cursor-move"
          style={{
            bottom: '0px',
            left: '0px', 
            right: '0px',
            height: '40px',
          }}
          onMouseDown={handleMouseDown}
        />
        
        {/* Areas around the wheel (not over it) */}
        <div 
          className="absolute pointer-events-auto cursor-move"
          style={{
            top: '270px',
            left: '33px', 
            width: '100px',
            height: '100px',
          }}
          onMouseDown={handleMouseDown}
        />
        
        <div 
          className="absolute pointer-events-auto cursor-move"
          style={{
            top: '270px',
            right: '33px', 
            width: '100px',
            height: '100px',
          }}
          onMouseDown={handleMouseDown}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-white rounded-t-lg shadow-xl border border-gray-300 overflow-hidden select-none"
      data-window-frame="true"
      data-interactive-app="true"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.isActive ? 1000 : window.zIndex,
      }}
      drag
      dragMomentum={false}
      onDrag={(event, info) => {
        onUpdateState({
          x: window.x + info.delta.x,
          y: window.y + info.delta.y,
        });
      }}
      onClick={() => onFocus()}
      initial={false}
      animate={{ 
        scale: window.isMinimized ? 0 : 1,
        opacity: window.isMinimized ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Title Bar */}
      <div className="window-titlebar h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 cursor-move">
        <div className="flex items-center gap-2">
          <button
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            onClick={onClose}
          />
          <button
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
            onClick={() => onUpdateState({ isMinimized: true })}
          />
          <button
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
            onClick={() => onUpdateState({ isMaximized: !window.isMaximized })}
          />
        </div>
        <div className="flex-1 text-center text-sm font-medium text-gray-700">
          {window.title}
        </div>
      </div>

      {/* Window Content */}
      <div className="window-content h-[calc(100%-32px)] overflow-auto bg-gray-50">
        <AppComponent />
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
          onFocus();
        }}
      />
    </motion.div>
  );
}
