import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollytellingTreeProps {
  className?: string;
}

// Define the 7 stages of growth
const growthStages = [
  {
    id: 'dirt',
    image: 'https://images.unsplash.com/photo-1574587471080-e8ac31065655?w=400&h=400&fit=crop&auto=format',
    alt: 'Rich brown soil ready for planting',
    title: 'The Beginning',
    description: 'Rich soil, full of potential'
  },
  {
    id: 'seed',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop&auto=format',
    alt: 'Seeds ready to be planted',
    title: 'The Seed',
    description: 'An idea takes root'
  },
  {
    id: 'sprout',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop&auto=format',
    alt: 'A tiny green sprout emerging from soil',
    title: 'First Growth',
    description: 'Breaking through the surface'
  },
  {
    id: 'young-tree',
    image: 'https://images.unsplash.com/photo-1574263867128-ffeab8c22f87?w=400&h=400&fit=crop&auto=format',
    alt: 'A young tree sapling with small branches',
    title: 'Taking Shape',
    description: 'Growing stronger, reaching higher'
  },
  {
    id: 'mature-tree',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=400&fit=crop&auto=format',
    alt: 'A mature tree with full branches',
    title: 'Bearing Fruit',
    description: 'Wisdom shared, knowledge multiplied'
  },
  {
    id: 'forest',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&auto=format',
    alt: 'Dense forest canopy from aerial view',
    title: 'The Forest',
    description: 'Part of something greater'
  },
  {
    id: 'cosmos',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format',
    alt: 'Stars and galaxies in deep space',
    title: 'Universal Connection',
    description: 'Infinite possibilities among the stars'
  }
];

export function ScrollytellingTree({ className = "" }: ScrollytellingTreeProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Use 400vh for scrollytelling distance
      const scrollytellingHeight = windowHeight * 4;
      
      // Calculate progress (0 to 1)
      let progress = scrollY / scrollytellingHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
      
      // SIMPLE STAGE CALCULATION: 7 stages (0-6), progress 0-1
      // Each stage gets 1/7th of the progress (approximately 14.3%)
      const stageIndex = Math.min(Math.floor(progress * 7), 6);
      
      setCurrentStage(stageIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scrollytelling-container ${className}`}>
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-secondary/50">
        {/* Images - only show current stage */}
        {growthStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className="absolute inset-0 scrollytelling-image"
            animate={{
              opacity: index === currentStage ? 1 : 0,
            }}
            transition={{ 
              opacity: { duration: 0.6, ease: "easeInOut" }
            }}
          >
            <img
              src={stage.image}
              alt={stage.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        ))}

        {/* Stage information */}
        {scrollProgress > 0.01 && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
            key={currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="mb-2 text-white drop-shadow-lg">
              {growthStages[currentStage]?.title}
            </h4>
            <p className="text-white/90 text-sm drop-shadow-md">
              {growthStages[currentStage]?.description}
            </p>
          </motion.div>
        )}

        {/* Progress dots */}
        {scrollProgress > 0.01 && (
          <div className="absolute top-4 right-4 flex gap-2">
            {growthStages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStage 
                    ? 'bg-white shadow-lg scale-125' 
                    : index < currentStage 
                      ? 'bg-white/80' 
                      : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Scroll hint */}
        {scrollProgress <= 0.01 && (
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-white text-center">
              <div className="mb-2 text-sm">Scroll to watch growth</div>
              <motion.div
                className="w-1 h-6 bg-white/70 rounded-full mx-auto"
                animate={{ height: [24, 12, 24] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        )}

        {/* Debug info */}
        <div className="absolute top-4 left-4 bg-black/80 text-white text-xs p-3 rounded font-mono">
          <div>Progress: {Math.round(scrollProgress * 100)}%</div>
          <div>Stage: {currentStage + 1}/7</div>
          <div>Current: {growthStages[currentStage]?.id}</div>
        </div>
      </div>
    </div>
  );
}