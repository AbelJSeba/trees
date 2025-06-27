# Midjourney Gallery App

A beautiful image gallery app for the Virtual Desktop that displays Midjourney images in a grid or list view.

## Features

- **Grid and List Views**: Toggle between grid and list layouts for browsing images
- **Search Functionality**: Filter images by name in real-time
- **Full-Screen Viewer**: Click any image to view it in full screen with navigation
- **Keyboard Navigation**: 
  - Use arrow keys to navigate between images in full-screen mode
  - Press ESC to close modals
- **Folder Configuration**: Configure a custom folder path to load your own images
- **Responsive Design**: Adapts to different window sizes
- **Smooth Animations**: Elegant transitions and hover effects

## Usage

1. Click the Midjourney icon on the desktop to open the gallery
2. Browse images in grid or list view
3. Use the search bar to filter images by name
4. Click any image to view it full-screen
5. Use arrow keys or on-screen buttons to navigate between images
6. Click the settings button to configure the image folder path

## Configuration

### Setting Image Folder Path

1. Click the settings button (gear icon) in the top-right corner
2. Enter the path to your Midjourney images folder
3. The gallery will attempt to load images from that directory
4. Leave the field empty to use placeholder images

### Image Loading

Currently, the app uses placeholder images for demonstration. To load actual images:

1. For web apps: Implement a backend API that scans the folder and returns image URLs
2. For Electron/desktop apps: Use the file system API to read the directory
3. Update the `useImageLoader` hook to handle your specific implementation

## Implementation Details

### File Structure
```
Midjourney/
├── Midjourney.tsx      # Main gallery component
├── useImageLoader.ts   # Custom hook for loading images
└── README.md          # This file
```

### Key Components

- **Midjourney.tsx**: Main component with gallery UI and interaction logic
- **useImageLoader.ts**: Handles image loading from folders or placeholders

### Customization

To customize the gallery:

1. **Change placeholder images**: Update the image generation logic in `useImageLoader.ts`
2. **Add image metadata**: Extend the `ImageData` interface with additional fields
3. **Implement folder scanning**: Add backend API or file system integration
4. **Customize styling**: Modify the Tailwind CSS classes in the components

## Future Enhancements

- Drag and drop image upload
- Image sorting options (name, date, size)
- Batch operations (delete, download, share)
- EXIF data display
- Zoom functionality in full-screen view
- Slideshow mode