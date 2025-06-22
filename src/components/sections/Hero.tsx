import { motion } from 'framer-motion';
import { ScrollytellingTree } from './ScrollytellingTree';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Sprout, BookOpen, PenTool, Microscope, Code, User } from 'lucide-react';

import { HeroProps } from '../../types';

export function Hero({ onSectionChange }: HeroProps) {
  return (
    <div className="bg-background">
      {/* Hero Section - Normal layout, not fixed */}
      <section className="relative py-16 md:py-20">
        <div className="container px-4 md:px-6">
          {/* Main Hero Content */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center w-full max-w-7xl mx-auto mb-16">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  <Sprout className="mr-2 h-3 w-3" />
                  Gardener
                </Badge>
                <h1 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Hi, I'm <span className="text-accent">Abel</span> welcome to my garden
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Welcome to my garden where my thoughts bloom, ideas take root, and knowledge grows organically. 
                  Explore my writing, reading notes, and deep dives into the topics that fascinate me.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button
                  onClick={() => onSectionChange('about')}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-foreground border border-transparent rounded-md hover:bg-muted hover:border-border transition-all duration-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                >
                  <User className="h-4 w-4" />
                  More about me
                </button>
                <button
                  onClick={() => onSectionChange('reading')}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-foreground border border-transparent rounded-md hover:bg-muted hover:border-border transition-all duration-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                >
                  <BookOpen className="h-4 w-4" />
                  My Reading Notes
                </button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-secondary border-accent/20">
                <ScrollytellingTree className="aspect-square rounded-lg mb-4" />
                <div className="space-y-2">
                  <h3 className="text-lg">Abel's Digital Ecosystem</h3>
                  <p className="text-sm text-muted-foreground">
                    Like a mighty tree, this space grows through continuous learning, 
                    deep roots of knowledge, and branches reaching toward new ideas.
                    Scroll to watch the journey unfold.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Stylish Green Bento Cards - Nature Theme */}
          <div className="w-full max-w-7xl mx-auto">
            <motion.div
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card 
                  className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#7fb069]/20 hover:-translate-y-1 border-0 bg-gradient-to-br from-[#7fb069]/12 via-white to-[#7fb069]/8"
                  onClick={() => onSectionChange('projects')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7fb069]/30 via-transparent to-[#7fb069]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#7fb069]/50 to-[#7fb069]/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Code className="h-5 w-5 text-[#5a8040]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-[#5a8040] transition-colors duration-300">Projects</h4>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Digital tools and experiences I've built along my coding journey.
                    </p>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card 
                  className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-1 border-0 bg-gradient-to-br from-green-50/50 via-white to-green-100/30"
                  onClick={() => onSectionChange('reading')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-transparent to-green-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-green-200/50 to-green-300/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-green-700 transition-colors duration-300">Reading Garden</h4>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Curated notes and insights from books that have shaped my thinking.
                    </p>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card 
                  className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-lime-500/20 hover:-translate-y-1 border-0 bg-gradient-to-br from-lime-50/40 via-white to-yellow-50/20"
                  onClick={() => onSectionChange('writing')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-100/25 via-transparent to-yellow-100/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-lime-200/40 to-yellow-200/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PenTool className="h-5 w-5 text-lime-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-lime-700 transition-colors duration-300">Writing</h4>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      My original thoughts, essays, and explorations on fascinating topics.
                    </p>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card 
                  className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-1 border-0 bg-gradient-to-br from-teal-50/40 via-white to-emerald-50/30"
                  onClick={() => onSectionChange('research')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-100/25 via-transparent to-emerald-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-teal-200/40 to-emerald-200/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Microscope className="h-5 w-5 text-teal-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-teal-700 transition-colors duration-300">Deep Dives</h4>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      In depth explorations of comprehensive topics.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}