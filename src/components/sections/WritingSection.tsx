import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, BookOpen, Feather } from 'lucide-react';
import { WritingSectionProps } from '../../types';
import { motion } from 'framer-motion';

type FilterType = 'all' | 'essay' | 'poetry';

export function WritingSection({ title, description, items, emptyMessage, onItemClick }: WritingSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [hoveredFilter, setHoveredFilter] = useState<FilterType | null>(null);

  const filteredItems = items.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const essayCount = items.filter(item => item.type === 'essay').length;
  const poetryCount = items.filter(item => item.type === 'poetry').length;

  const getFilterIcon = (filter: FilterType) => {
    switch (filter) {
      case 'essay':
        return <BookOpen className="w-4 h-4" />;
      case 'poetry':
        return <Feather className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getFilterLabel = (filter: FilterType) => {
    switch (filter) {
      case 'all':
        return `All (${items.length})`;
      case 'essay':
        return `Essays (${essayCount})`;
      case 'poetry':
        return `Poetry (${poetryCount})`;
      default:
        return filter;
    }
  };

  const FilterButton = ({ filter }: { filter: FilterType }) => {
    const isActive = activeFilter === filter;
    const isHovered = hoveredFilter === filter;
    
    // Determine the exact state - only one can be true at a time
    let buttonState: 'active' | 'hovered' | 'inactive';
    
    if (isHovered) {
      buttonState = 'hovered';
    } else if (isActive && hoveredFilter === null) {
      buttonState = 'active';
    } else {
      buttonState = 'inactive';
    }
    
    let buttonClasses = 'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none';
    
    if (filter === 'poetry') {
      switch (buttonState) {
        case 'hovered':
          buttonClasses += ' bg-emerald-700 text-white shadow-sm focus:outline-none transition-none';
          break;
        case 'active':
          buttonClasses += ' bg-emerald-600 text-white shadow-sm focus:outline-none transition-colors duration-150';
          break;
        default:
          buttonClasses += ' text-muted-foreground focus:outline-none transition-colors duration-150';
      }
    } else if (filter === 'essay') {
      switch (buttonState) {
        case 'hovered':
          buttonClasses += ' bg-[#7A9660] text-white shadow-sm focus:outline-none transition-none';
          break;
        case 'active':
          buttonClasses += ' bg-[#87A96B] text-white shadow-sm focus:outline-none transition-colors duration-150';
          break;
        default:
          buttonClasses += ' text-muted-foreground focus:outline-none transition-colors duration-150';
      }
    } else {
      switch (buttonState) {
        case 'hovered':
          buttonClasses += ' bg-[#6a9659] text-white shadow-sm focus:ring-[#7fb069] transition-none';
          break;
        case 'active':
          buttonClasses += ' bg-[#7fb069] text-white shadow-sm focus:ring-[#7fb069] transition-colors duration-150';
          break;
        default:
          buttonClasses += ' text-muted-foreground focus:ring-[#7fb069] transition-colors duration-150';
      }
    }
    
    return (
      <button
        onClick={() => setActiveFilter(filter)}
        onMouseEnter={() => setHoveredFilter(filter)}
        onMouseLeave={() => setHoveredFilter(null)}
        className={buttonClasses}
      >
        {getFilterIcon(filter)}
        <span className="capitalize">{getFilterLabel(filter)}</span>
      </button>
    );
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
            <h1 className="text-4xl md:text-5xl font-medium text-accent">
              Writing
            </h1>
          </motion.div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {(['all', 'essay', 'poetry'] as FilterType[]).map((filter) => (
                  <FilterButton key={filter} filter={filter} />
                ))}
              </div>
            </div>

            {/* Content Grid */}
            {filteredItems.length > 0 ? (
              <div className="space-y-8">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className="group overflow-hidden border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 bg-card/50 hover:bg-card cursor-pointer"
                      onClick={() => onItemClick(item)}
                    >
                      <div className="flex gap-6 p-6">
                        {/* Writing Image */}
                        <div className="flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            width={192}
                            height={128}
                            className="w-48 h-32 object-cover"
                          />
                        </div>

                        {/* Writing Content */}
                        <div className="flex-grow">
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

                          {/* Bottom Row: Type Badge and Read Time */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* Type Badge */}
                              <Badge 
                                variant="outline" 
                                className="flex items-center gap-1.5 text-xs px-2.5 py-1 border-accent/30 bg-accent/5 text-accent"
                              >
                                {item.type === 'poetry' ? <Feather className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                                {item.type === 'poetry' ? 'Poetry' : 'Essay'}
                              </Badge>

                              {/* Read Time */}
                              <span className="text-sm text-muted-foreground">
                                {item.readTime}
                              </span>
                            </div>

                            {/* Read Link */}
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                              Read {item.type === 'poetry' ? 'poem' : 'essay'} →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-4 text-muted-foreground">
                  {activeFilter === 'all' ? '🌱' : activeFilter === 'poetry' ? '🌸' : '📝'}
                </div>
                <p className="text-muted-foreground">
                  {activeFilter === 'all' 
                    ? emptyMessage
                    : `No ${activeFilter === 'poetry' ? 'poetry' : 'essays'} available yet. Check back soon!`
                  }
                </p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}