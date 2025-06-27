import { useState, useEffect } from 'react';

export interface ImageData {
  id: string;
  src: string;
  name: string;
  size?: string;
  date?: string;
}

interface UseImageLoaderProps {
  folderPath?: string;
  usePlaceholders?: boolean;
}

export function useImageLoader({ folderPath, usePlaceholders = true }: UseImageLoaderProps = {}) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);

      try {
        if (folderPath && !usePlaceholders) {
          // In a real implementation, this would load images from the folder
          // For now, we'll simulate loading local images
          console.log(`Loading images from: ${folderPath}`);
          
          // This is where you would implement actual folder scanning
          // For web apps, you'd need a backend API to list files
          // For Electron/desktop apps, you could use fs module
          
          setImages([]);
        } else {
          // Use placeholder images for demo
          const placeholderImages: ImageData[] = Array.from({ length: 24 }, (_, i) => ({
            id: `img-${i}`,
            src: `https://picsum.photos/seed/midjourney-${i}/400/300`,
            name: `midjourney-${String(i + 1).padStart(3, '0')}.png`,
            size: `${(Math.random() * 4 + 1).toFixed(1)}MB`,
            date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }));
          
          setImages(placeholderImages);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [folderPath, usePlaceholders]);

  return { images, loading, error };
}