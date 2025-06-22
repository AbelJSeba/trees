import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, FlaskConical } from 'lucide-react';
import { ResearchItem } from '../../types';
import { motion } from 'framer-motion';

interface ResearchSectionProps {
  title: string;
  description: string;
  items: ResearchItem[];
  emptyMessage: string;
}

export function ResearchSection({ title, description, items, emptyMessage }: ResearchSectionProps) {
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
              {title}
            </h1>
            <p className="text-lg text-muted-foreground mx-auto">
              {description}
            </p>
          </motion.div>

          {/* Research Items Grid */}
          {items.length > 0 ? (
            <div className="space-y-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 bg-card/50 hover:bg-card cursor-pointer">

                    <div className="relative p-6">
                      {/* Title */}
                      <h3 className="text-xl font-medium text-accent group-hover:opacity-80 transition-opacity duration-300 mb-2">
                        {item.title}
                      </h3>
                      
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{item.date}</span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>

                      {/* Bottom Row: Status Badge, Tags, and Read Time */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Research Badge */}
                          <Badge 
                            variant="outline" 
                            className="flex items-center gap-1.5 text-xs border-accent/30 bg-accent/5 text-accent px-2.5 py-1"
                          >
                            <FlaskConical className="w-3 h-3" />
                            Computer Architecture
                          </Badge>

                          {/* Tags */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                              {item.tags.slice(0, 3).map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="text-xs px-2 py-0.5"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                  +{item.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Read Time */}
                        <span className="text-sm text-muted-foreground">
                          {item.readTime}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4 text-muted-foreground">
                🔬
              </div>
              <p className="text-muted-foreground">
                {emptyMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}