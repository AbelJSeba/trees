import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Info, Camera, Aperture, Timer, Film } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ImageItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  date: string;
  location?: string;
  camera?: string;
  settings?: {
    aperture?: string;
    shutter?: string;
    iso?: string;
  };
}

interface ImageLightboxProps {
  image: ImageItem;
  onClose: () => void;
  images: ImageItem[];
}

export function ImageLightbox({ image, onClose, images }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(images.findIndex(img => img.id === image.id));
  const [showInfo, setShowInfo] = useState(false);
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigatePrevious();
      if (e.key === 'ArrowRight') navigateNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  const navigatePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.url;
    link.download = `${currentImage.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    link.target = '_blank';
    link.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="text-white">
              <h2 className="text-xl font-medium">{currentImage.title}</h2>
              <p className="text-white/70 text-sm">{currentIndex + 1} / {images.length}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Info className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage.id}
              src={currentImage.url}
              alt={currentImage.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigatePrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-black/80 backdrop-blur-sm p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-lg font-medium mb-4">Image Details</h3>
              
              <div className="space-y-4 text-white/80">
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm">{currentImage.description}</p>
                </div>

                {currentImage.location && (
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">Location</h4>
                    <p className="text-sm">{currentImage.location}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Date</h4>
                  <p className="text-sm">{currentImage.date}</p>
                </div>

                {currentImage.camera && (
                  <div>
                    <h4 className="text-white text-sm font-medium mb-2">Camera Info</h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-white/70 border-white/30">
                        <Camera className="w-3 h-3 mr-1" />
                        {currentImage.camera}
                      </Badge>
                    </div>
                  </div>
                )}

                {currentImage.settings && (
                  <div>
                    <h4 className="text-white text-sm font-medium mb-2">Settings</h4>
                    <div className="space-y-2">
                      {currentImage.settings.aperture && (
                        <Badge variant="outline" className="text-white/70 border-white/30">
                          <Aperture className="w-3 h-3 mr-1" />
                          {currentImage.settings.aperture}
                        </Badge>
                      )}
                      {currentImage.settings.shutter && (
                        <Badge variant="outline" className="text-white/70 border-white/30 ml-2">
                          <Timer className="w-3 h-3 mr-1" />
                          {currentImage.settings.shutter}
                        </Badge>
                      )}
                      {currentImage.settings.iso && (
                        <Badge variant="outline" className="text-white/70 border-white/30 ml-2">
                          <Film className="w-3 h-3 mr-1" />
                          ISO {currentImage.settings.iso}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}