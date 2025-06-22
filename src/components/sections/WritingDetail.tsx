import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ArrowLeft, Calendar, Clock, BookOpen, Feather } from 'lucide-react';

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

      </div>
    </div>
  );
}