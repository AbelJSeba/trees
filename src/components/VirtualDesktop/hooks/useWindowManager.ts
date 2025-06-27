import { useState, useCallback } from 'react';
import { WindowState, AppType } from '../types';

let windowIdCounter = 0;
let zIndexCounter = 1000;

const getDefaultWindowProps = (appType: AppType): Partial<WindowState> => {
  switch (appType) {
    case 'iPod':
      return { title: 'iPod', width: 400, height: 650 };
    case 'PhotoBooth':
      return { title: 'Photos', width: 640, height: 480 };
    case 'Files':
      return { title: 'Projects', width: 800, height: 600 };
    case 'Midjourney':
      return { title: 'Midjourney Gallery', width: 900, height: 700 };
    default:
      return { title: 'Window', width: 600, height: 400 };
  }
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = useCallback((appType: AppType) => {
    const defaultProps = getDefaultWindowProps(appType);
    const newWindow: WindowState = {
      id: `window-${windowIdCounter++}`,
      appType,
      title: defaultProps.title || 'Window',
      x: 100 + (windowIdCounter * 20) % 200,
      y: 50 + (windowIdCounter * 20) % 200,
      width: defaultProps.width || 600,
      height: defaultProps.height || 400,
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: zIndexCounter++,
    };

    setWindows(prev => {
      // Deactivate all other windows
      const updated = prev.map(w => ({ ...w, isActive: false }));
      return [...updated, newWindow];
    });
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => ({
      ...w,
      isActive: w.id === windowId,
      zIndex: w.id === windowId ? zIndexCounter++ : w.zIndex,
    })));
  }, []);

  const updateWindowState = useCallback((windowId: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, ...updates } : w
    ));
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    updateWindowState,
  };
}