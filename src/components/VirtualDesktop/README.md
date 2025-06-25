# Virtual Desktop Component

A macOS-style virtual desktop environment for showcasing creative portfolio items as desktop applications.

## Features

- **Desktop Environment**: Full macOS-style desktop with wallpaper support
- **Menu Bar**: System menu with clock, controls, and app menus
- **Window Management**: Draggable, resizable windows with minimize/maximize/close
- **Desktop Icons**: Clickable app icons that launch windows
- **Applications**: iPod, Photo Booth, Files, and Virtual PC apps

## Architecture

```
VirtualDesktop/
├── components/
│   ├── Desktop.tsx       # Main desktop surface with wallpaper
│   ├── MenuBar.tsx       # Top menu bar
│   ├── WindowFrame.tsx   # Window container with controls
│   ├── AppIcon.tsx       # Desktop app icons
│   └── ContextMenu.tsx   # Right-click menu
├── apps/
│   ├── iPod/            # Music player app
│   ├── PhotoBooth/      # Camera app
│   ├── Files/           # File browser
│   └── VirtualPC/       # DOS emulator
├── hooks/
│   ├── useWindowManager.ts  # Window state management
│   └── useDesktopState.ts   # Desktop preferences
└── types.ts             # TypeScript definitions
```

## Adding New Applications

1. **Create App Component**:
```tsx
// src/components/VirtualDesktop/apps/MyApp/MyApp.tsx
export function MyApp() {
  return (
    <div className="h-full p-4">
      <h1>My App</h1>
      {/* App content */}
    </div>
  );
}
```

2. **Add to Types**:
```tsx
// src/components/VirtualDesktop/types.ts
export type AppType = 'iPod' | 'PhotoBooth' | 'Files' | 'VirtualPC' | 'MyApp';

// Add to DESKTOP_APPS
{ id: '5', name: 'My App', type: 'MyApp', icon: '🆕', x: 20, y: 420 }
```

3. **Register in WindowFrame**:
```tsx
// src/components/VirtualDesktop/components/WindowFrame.tsx
import { MyApp } from '../apps/MyApp/MyApp';

const APP_COMPONENTS = {
  // ... existing apps
  MyApp: MyApp,
};
```

4. **Set Default Window Size**:
```tsx
// src/components/VirtualDesktop/hooks/useWindowManager.ts
case 'MyApp':
  return { title: 'My App', width: 600, height: 400 };
```

## Customization

### Wallpapers
Change wallpaper through the Apple menu or programmatically:
```tsx
setWallpaper('linear-gradient(to bottom, #ff7e5f, #feb47b)');
// or
setWallpaper('/path/to/image.jpg');
```

### Window Behavior
Customize window properties when opening:
```tsx
const defaultProps = {
  title: 'Custom Title',
  width: 800,
  height: 600,
  x: 100,
  y: 100,
};
```

## Testing

Run tests with:
```bash
npm test
```

Test files are located in `__tests__/` directories alongside components.

## State Management

- **Window State**: Managed by `useWindowManager` hook
- **Desktop State**: Managed by `useDesktopState` hook with localStorage persistence
- **App State**: Each app manages its own internal state

## Performance Considerations

- Windows are rendered only when not minimized
- Desktop state persists to localStorage
- Drag operations use React state batching
- Window z-index auto-increments to maintain stacking order

## Future Enhancements

- [ ] Window snapping/tiling
- [ ] Dock/taskbar
- [ ] Multiple desktop spaces
- [ ] App state persistence
- [ ] Full-screen mode
- [ ] Keyboard shortcuts
- [ ] App notifications
- [ ] File system integration
- [ ] Actual iPod music player
- [ ] Real camera access for Photo Booth