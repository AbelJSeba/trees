import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ArrowLeft, Calendar, Clock, BookOpen, Feather, Share2, Heart } from 'lucide-react';

interface WritingDetailProps {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  type: 'essay' | 'poetry';
  content: string;
  onBack: () => void;
}

export function WritingDetail({ 
  title, 
  description, 
  date, 
  readTime, 
  tags, 
  image, 
  type, 
  content, 
  onBack 
}: WritingDetailProps) {
  const formatContent = (text: string) => {
    if (type === 'poetry') {
      // For poetry, preserve line breaks and add proper spacing
      return text.split('\n').map((line, index) => (
        <span key={index} className="block leading-relaxed">
          {line.trim() === '' ? <br /> : line}
        </span>
      ));
    } else {
      // For essays, split into paragraphs
      return text.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-6 leading-relaxed">
          {paragraph}
        </p>
      ));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Writing
        </Button>

        {/* Hero Image */}
        <div className="aspect-video overflow-hidden rounded-lg mb-8 shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge 
              variant="secondary" 
              className={`
                flex items-center gap-2
                ${type === 'poetry' 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                }
              `}
            >
              {type === 'poetry' ? <Feather className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              {type === 'poetry' ? 'Poetry' : 'Essay'}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          
          <h1 className="mb-4 text-foreground">{title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Like
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 bg-card border-border">
          <div className={`
            ${type === 'poetry' 
              ? 'text-center font-serif leading-loose text-lg' 
              : 'prose prose-lg max-w-none'
            }
            text-foreground
          `}>
            {formatContent(content)}
          </div>
        </Card>

        {/* Author Section */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-medium text-xl">AJS</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Abel</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Writer, thinker, and gardener. I explore the intersections of technology, 
                nature, and human experience through essays and poetry.
              </p>
            </div>
          </div>
        </div>

        {/* Related Writings Section */}
        <div className="mt-12">
          <h3 className="mb-6 text-foreground">More from Abel</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=100&h=100&fit=crop&auto=format"
                    alt="Related writing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1 text-sm">On Creative Consistency</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    How I learned to nurture my creative practice like tending a garden...
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&auto=format"
                    alt="Related writing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1 text-sm">Roots in Stone</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    A meditation on resilience and growth, inspired by trees...
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}