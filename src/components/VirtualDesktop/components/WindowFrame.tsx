import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { WindowState } from '../types';
import { iPod } from '../apps/iPod/iPod';
import { PhotoBooth } from '../apps/PhotoBooth/PhotoBooth';
import { Files } from '../apps/Files/Files';
import { TextEdit } from '../apps/TextEdit/TextEdit';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
const MENU_BAR_OFFSET = 40;

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
  TextEdit: TextEdit,
};

const MIN_WINDOW_WIDTH = 420;
const MIN_WINDOW_HEIGHT = 280;

export function WindowFrame({ window, onClose, onFocus, onUpdateState }: WindowFrameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeOriginRef = useRef({
    startX: 0,
    startY: 0,
    width: window.width,
    height: window.height,
    x: window.x,
    y: window.y,
  });
  const resizeDirectionRef = useRef<ResizeDirection>('se');

  const beginDrag = useCallback(
    (clientX: number, clientY: number) => {
      const rect = windowRef.current?.getBoundingClientRect();
      const offsetX = rect ? clientX - rect.left : clientX - window.x;
      const offsetY = rect ? clientY - rect.top : clientY - window.y;
      setDragStart({ x: offsetX, y: offsetY });
      setIsDragging(true);
      onFocus();
    },
    [onFocus, window.x, window.y]
  );

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const isPrimaryMouseEvent = 'button' in e ? e.button === 0 : true;
    if (!isPrimaryMouseEvent) return;

    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    if ('touches' in e) {
      e.preventDefault();
    } else {
      (e as React.MouseEvent).preventDefault();
    }

    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    beginDrag(point.clientX, point.clientY);
  };

  const handlePointerMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      if ('touches' in event && event.cancelable) {
        event.preventDefault();
      }

      const point =
        'touches' in event && event.touches.length
          ? event.touches[0]
          : (event as MouseEvent);

      const globalRoot = globalThis as {
        innerWidth?: number;
        innerHeight?: number;
      };
      const viewportWidth =
        typeof globalRoot.innerWidth === 'number'
          ? globalRoot.innerWidth
          : window.width;
      const viewportHeight =
        typeof globalRoot.innerHeight === 'number'
          ? globalRoot.innerHeight
          : window.height;
      const newX = point.clientX - dragStart.x;
      const newY = point.clientY - dragStart.y;
      const maxX = Math.max(0, viewportWidth - window.width);
      const maxY = Math.max(MENU_BAR_OFFSET, viewportHeight - window.height);

      onUpdateState({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(MENU_BAR_OFFSET, newY), maxY),
      });
    },
    [dragStart.x, dragStart.y, isDragging, onUpdateState, window.height, window.width]
  );

  const handlePointerEnd = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (!(isDragging || isResizing)) return;

    const moveListener = (event: MouseEvent | TouchEvent) => {
      if (isResizing) {
        const point =
          'touches' in event && event.touches.length
            ? event.touches[0]
            : (event as MouseEvent);

        if ('touches' in event && event.cancelable) {
          event.preventDefault();
        }

        const globalRoot = globalThis as {
          innerWidth?: number;
          innerHeight?: number;
        };

        const viewportWidth =
          typeof globalRoot.innerWidth === 'number'
            ? globalRoot.innerWidth
            : window.width;
        const viewportHeight =
          typeof globalRoot.innerHeight === 'number'
            ? globalRoot.innerHeight
            : window.height;

        const clamp = (value: number, min: number, max: number) =>
          Math.min(Math.max(value, min), max);

        const { startX, startY, width, height, x, y } = resizeOriginRef.current;
        const direction = resizeDirectionRef.current;
        const deltaX = point.clientX - startX;
        const deltaY = point.clientY - startY;

        let nextX = x;
        let nextY = y;
        let nextWidth = width;
        let nextHeight = height;

        if (direction.includes('e')) {
          const maxWidth = Math.max(MIN_WINDOW_WIDTH, viewportWidth - nextX);
          nextWidth = clamp(width + deltaX, MIN_WINDOW_WIDTH, maxWidth);
        }

        if (direction.includes('s')) {
          const maxHeight = Math.max(MIN_WINDOW_HEIGHT, viewportHeight - nextY);
          nextHeight = clamp(height + deltaY, MIN_WINDOW_HEIGHT, maxHeight);
        }

        if (direction.includes('w')) {
          const minDelta = -x;
          const maxDelta = width - MIN_WINDOW_WIDTH;
          const adjustedDelta = clamp(deltaX, minDelta, maxDelta);
          nextX = x + adjustedDelta;
          const maxWidth = Math.max(MIN_WINDOW_WIDTH, viewportWidth - nextX);
          nextWidth = clamp(width - adjustedDelta, MIN_WINDOW_WIDTH, maxWidth);
        }

        if (direction.includes('n')) {
          const minDelta = MENU_BAR_OFFSET - y;
          const maxDelta = height - MIN_WINDOW_HEIGHT;
          const adjustedDelta = clamp(deltaY, minDelta, maxDelta);
          nextY = y + adjustedDelta;
          const maxHeight = Math.max(MIN_WINDOW_HEIGHT, viewportHeight - nextY);
          nextHeight = clamp(height - adjustedDelta, MIN_WINDOW_HEIGHT, maxHeight);
        }

        onUpdateState({
          x: Math.round(nextX),
          y: Math.round(nextY),
          width: Math.round(nextWidth),
          height: Math.round(nextHeight),
        });
        return;
      }

      handlePointerMove(event);
    };

    const upListener = () => handlePointerEnd();

    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
    document.addEventListener('touchmove', moveListener, { passive: false });
    document.addEventListener('touchend', upListener);
    document.addEventListener('touchcancel', upListener);

    return () => {
      document.removeEventListener('mousemove', moveListener);
      document.removeEventListener('mouseup', upListener);
      document.removeEventListener('touchmove', moveListener);
      document.removeEventListener('touchend', upListener);
      document.removeEventListener('touchcancel', upListener);
    };
  }, [
    handlePointerEnd,
    handlePointerMove,
    isDragging,
    isResizing,
    onUpdateState,
    window.height,
    window.width,
    window.x,
    window.y,
  ]);

  const handleResizeStart = (
    e: React.MouseEvent | React.TouchEvent,
    direction: ResizeDirection
  ) => {
    const isPrimaryMouseEvent = 'button' in e ? e.button === 0 : true;
    if (!isPrimaryMouseEvent) return;

    e.stopPropagation();
    if ('touches' in e) {
      e.preventDefault();
    } else {
      (e as React.MouseEvent).preventDefault();
    }

    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    resizeOriginRef.current = {
      startX: point.clientX,
      startY: point.clientY,
      width: window.width,
      height: window.height,
      x: window.x,
      y: window.y,
    };
    resizeDirectionRef.current = direction;
    setIsResizing(true);
    onFocus();
  };

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
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
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
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
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
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
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
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
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
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
        
        <div 
          className="absolute pointer-events-auto cursor-move"
          style={{
            top: '270px',
            right: '33px', 
            width: '100px',
            height: '100px',
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
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
      onClick={() => onFocus()}
      initial={false}
      animate={{ 
        scale: window.isMinimized ? 0 : 1,
        opacity: window.isMinimized ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Resize Handles */}
      <div
        className="absolute -top-2 left-1/2 z-50 h-3 w-12 -translate-x-1/2 cursor-n-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 'n')}
        onTouchStart={(e) => handleResizeStart(e, 'n')}
      />
      <div
        className="absolute -bottom-2 left-1/2 z-50 h-3 w-12 -translate-x-1/2 cursor-s-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 's')}
        onTouchStart={(e) => handleResizeStart(e, 's')}
      />
      <div
        className="absolute top-1/2 -left-2 z-50 h-12 w-3 -translate-y-1/2 cursor-w-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 'w')}
        onTouchStart={(e) => handleResizeStart(e, 'w')}
      />
      <div
        className="absolute top-1/2 -right-2 z-50 h-12 w-3 -translate-y-1/2 cursor-e-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 'e')}
        onTouchStart={(e) => handleResizeStart(e, 'e')}
      />
      <div
        className="absolute -top-2 -left-2 z-50 h-4 w-4 cursor-nw-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 'nw')}
        onTouchStart={(e) => handleResizeStart(e, 'nw')}
      />
      <div
        className="absolute -top-2 -right-2 z-50 h-4 w-4 cursor-ne-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 'ne')}
        onTouchStart={(e) => handleResizeStart(e, 'ne')}
      />
      <div
        className="absolute -bottom-2 -left-2 z-50 h-4 w-4 cursor-sw-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 'sw')}
        onTouchStart={(e) => handleResizeStart(e, 'sw')}
      />
      <div
        className="absolute -bottom-2 -right-2 z-50 h-4 w-4 cursor-se-resize touch-action-none"
        onMouseDown={(e) => handleResizeStart(e, 'se')}
        onTouchStart={(e) => handleResizeStart(e, 'se')}
      />

      {/* Title Bar */}
      <div
        className="window-titlebar h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 cursor-move"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
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
        onMouseDown={(e) => handleResizeStart(e, 'se')}
        onTouchStart={(e) => handleResizeStart(e, 'se')}
      />
    </motion.div>
  );
}
