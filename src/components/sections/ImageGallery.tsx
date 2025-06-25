import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Calendar, Camera as CameraIcon, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ImageLightbox } from './ImageLightbox';

interface ImageItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  category: 'nature' | 'urban' | 'abstract' | 'blackwhite';
  date: string;
  location?: string;
  camera?: string;
  settings?: {
    aperture?: string;
    shutter?: string;
    iso?: string;
  };
}

const sampleImages: ImageItem[] = [
  {
    id: '1',
    title: 'Morning Mist',
    description: 'Early morning fog rolling through the forest',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
    category: 'nature',
    date: 'January 2024',
    location: 'Pacific Northwest',
    camera: 'Canon R5',
    settings: { aperture: 'f/2.8', shutter: '1/125', iso: '400' }
  },
  {
    id: '2',
    title: 'Urban Geometry',
    description: 'Architectural patterns in the city',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
    thumbnailUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
    category: 'urban',
    date: 'December 2023',
    location: 'New York City',
    camera: 'Sony A7IV'
  },
  {
    id: '3',
    title: 'Abstract Waves',
    description: 'Light patterns creating abstract formations',
    url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=500&fit=crop',
    category: 'abstract',
    date: 'November 2023',
    camera: 'Fujifilm X-T4',
    settings: { aperture: 'f/5.6', shutter: '1/250', iso: '200' }
  },
  {
    id: '4',
    title: 'Silent Forest',
    description: 'Black and white study of forest textures',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=400&fit=crop&grayscale',
    category: 'blackwhite',
    date: 'October 2023',
    location: 'Oregon',
    camera: 'Leica Q2',
    settings: { aperture: 'f/4', shutter: '1/60', iso: '800' }
  },
  {
    id: '5',
    title: 'Golden Hour',
    description: 'Sunset light filtering through trees',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    category: 'nature',
    date: 'September 2023',
    location: 'California',
    camera: 'Nikon Z9'
  },
  {
    id: '6',
    title: 'City Lights',
    description: 'Night photography in the urban jungle',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=500&fit=crop',
    category: 'urban',
    date: 'August 2023',
    location: 'Tokyo',
    camera: 'Canon R5',
    settings: { aperture: 'f/1.4', shutter: '1/30', iso: '3200' }
  }
];

const categoryConfig = {
  all: { label: 'All', color: 'bg-accent/10 text-accent' },
  nature: { label: 'Nature & Landscapes', color: 'bg-green-100 text-green-700' },
  urban: { label: 'Urban Exploration', color: 'bg-blue-100 text-blue-700' },
  abstract: { label: 'Abstract & Experimental', color: 'bg-purple-100 text-purple-700' },
  blackwhite: { label: 'Black & White', color: 'bg-gray-100 text-gray-700' }
};

type CategoryType = keyof typeof categoryConfig;

export function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? sampleImages 
    : sampleImages.filter(img => img.category === selectedCategory);

  const getCategoryCount = (category: CategoryType) => {
    if (category === 'all') return sampleImages.length;
    return sampleImages.filter(img => img.category === category).length;
  };

  return (
    <>
      <div className="space-y-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {(Object.keys(categoryConfig) as CategoryType[]).map((category) => {
            const config = categoryConfig[category];
            const isActive = selectedCategory === category;
            const count = getCategoryCount(category);
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? config.color + ' shadow-md scale-105' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid"
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={image.thumbnailUrl}
                      alt={image.title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      onClick={() => setSelectedImage(image)}
                    />
                    
                    {/* Overlay on hover */}
                    <AnimatePresence>
                      {hoveredId === image.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4"
                        >
                          <h3 className="text-white font-medium text-lg mb-1">{image.title}</h3>
                          <p className="text-white/80 text-sm mb-2">{image.description}</p>
                          
                          <div className="flex items-center gap-3 text-white/70 text-xs">
                            {image.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {image.location}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {image.date}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button
                              onClick={() => setSelectedImage(image)}
                              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                            >
                              <Maximize2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Quick info (always visible) */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {image.camera && (
                          <Badge variant="secondary" className="text-xs">
                            <CameraIcon className="w-3 h-3 mr-1" />
                            {image.camera}
                          </Badge>
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${categoryConfig[image.category].color}`}
                      >
                        {categoryConfig[image.category].label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          images={filteredImages}
        />
      )}
    </>
  );
}