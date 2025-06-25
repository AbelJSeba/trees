export type AppType = 'iPod' | 'PhotoBooth' | 'Files';

export interface WindowState {
  id: string;
  appType: AppType;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
}

export interface DesktopApp {
  id: string;
  name: string;
  type: AppType;
  icon: string;
  x: number;
  y: number;
}

export interface DesktopState {
  wallpaper: string;
  apps: DesktopApp[];
}

export const DEFAULT_WALLPAPERS = [
  '/wallpapers/monterey.jpg',
  '/wallpapers/big-sur.jpg',
  '/wallpapers/catalina.jpg',
  '/wallpapers/mojave.jpg',
] as const;

export const DESKTOP_APPS: DesktopApp[] = [
  { id: '1', name: 'iPod', type: 'iPod', icon: '🎵', x: 20, y: 20 },
  { id: '2', name: 'Photos', type: 'PhotoBooth', icon: '/icons/apple-photos.svg', x: 20, y: 120 },
  { id: '3', name: 'Projects', type: 'Files', icon: '/icons/files.svg', x: 20, y: 220 },
];