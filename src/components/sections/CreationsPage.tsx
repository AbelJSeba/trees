import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Projects } from './Projects';
import { ImageGallery } from './ImageGallery';
import { MusicPlayer } from './MusicPlayer';
import { TreePine, Camera, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CreationType = 'projects' | 'images' | 'music';

export function CreationsPage() {
  const [activeTab, setActiveTab] = useState<CreationType>('projects');

  const tabConfig = {
    projects: {
      icon: TreePine,
      label: 'Projects',
      count: 3,
      color: 'text-[#7fb069]',
      bgHover: 'hover:bg-[#7fb069]/10',
      bgActive: 'data-[state=active]:bg-[#7fb069]/20'
    },
    images: {
      icon: Camera,
      label: 'Images',
      count: 12,
      color: 'text-[#f4a261]',
      bgHover: 'hover:bg-[#f4a261]/10',
      bgActive: 'data-[state=active]:bg-[#f4a261]/20'
    },
    music: {
      icon: Music,
      label: 'Music',
      count: 8,
      color: 'text-[#2a9d8f]',
      bgHover: 'hover:bg-[#2a9d8f]/10',
      bgActive: 'data-[state=active]:bg-[#2a9d8f]/20'
    }
  };

  return (
    <section className="min-h-screen py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-medium text-accent mb-4">
              Creations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my digital forest of projects, visual captures, and sonic landscapes
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as CreationType)}
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-white/70 dark:bg-black/30 backdrop-blur-md p-1.5 shadow-lg border border-border/50">
                {(Object.keys(tabConfig) as CreationType[]).map((type) => {
                  const config = tabConfig[type];
                  const Icon = config.icon;
                  
                  return (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className={`
                        relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                        transition-all duration-300 ease-out
                        ${config.bgHover} ${config.bgActive}
                        data-[state=active]:shadow-sm
                        data-[state=active]:scale-[1.02]
                        group
                      `}
                    >
                      <Icon className={`
                        w-5 h-5 transition-all duration-300
                        ${activeTab === type ? config.color : 'text-muted-foreground'}
                        group-hover:scale-110
                      `} />
                      <span className={`
                        transition-colors duration-300
                        ${activeTab === type ? 'text-foreground' : 'text-muted-foreground'}
                      `}>
                        {config.label}
                      </span>
                      <span className={`
                        ml-1 text-xs px-2 py-0.5 rounded-full
                        transition-all duration-300
                        ${activeTab === type 
                          ? `${config.color} bg-current/10` 
                          : 'text-muted-foreground bg-muted'
                        }
                      `}>
                        {config.count}
                      </span>
                      
                      {/* Active indicator animation */}
                      {activeTab === type && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-current/5 to-transparent"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="projects" className="mt-0">
                  <Projects />
                </TabsContent>
                
                <TabsContent value="images" className="mt-0">
                  <ImageGallery />
                </TabsContent>
                
                <TabsContent value="music" className="mt-0">
                  <MusicPlayer />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </section>
  );
}