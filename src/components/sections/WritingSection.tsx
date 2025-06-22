import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, BookOpen, Feather } from 'lucide-react';
import { WritingSectionProps } from '../../types';

type FilterType = 'all' | 'essay' | 'poetry';

export function WritingSection({ title, description, items, emptyMessage, onItemClick }: WritingSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

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

  const getFilterButtonClasses = (filter: FilterType) => {
    if (activeFilter !== filter) {
      return 'text-muted-foreground hover:text-foreground hover:bg-background/50';
    }

    // Different green shades for active filter buttons
    switch (filter) {
      case 'poetry':
        return 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'; // Light green for poetry
      case 'essay':
        return 'bg-green-700 text-white shadow-sm hover:bg-green-800'; // Darker green for essays
      default:
        return 'bg-primary text-primary-foreground shadow-sm'; // Default green
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="mb-4 text-foreground">{title}</h1>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {(['all', 'essay', 'poetry'] as FilterType[]).map((filter) => (
                  <Button
                    key={filter}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200
                      ${getFilterButtonClasses(filter)}
                    `}
                  >
                    {getFilterIcon(filter)}
                    <span className="capitalize">{getFilterLabel(filter)}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card cursor-pointer flex flex-col"
                    onClick={() => onItemClick(item)}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`
                    }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant="secondary" 
                          className={`
                            text-xs flex items-center gap-1
                            ${item.type === 'poetry' 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            }
                          `}
                        >
                          {item.type === 'poetry' ? <Feather className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                          {item.type === 'poetry' ? 'Poetry' : 'Essay'}
                        </Badge>
                      </div>
                      
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 flex-grow">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read {item.type === 'poetry' ? 'Poem' : 'Essay'}
                      </Button>
                    </CardContent>
                  </Card>
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

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}