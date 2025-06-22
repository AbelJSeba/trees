import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  tags: string[];
  image?: string;
  link?: string;
}

interface ContentSectionProps {
  title: string;
  description: string;
  items: ContentItem[];
  emptyMessage: string;
}

export function ContentSection({ title, description, items, emptyMessage }: ContentSectionProps) {
  if (items.length === 0) {
    return (
      <section className="min-h-screen py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl tracking-tighter">{title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
              <div className="mt-12 p-12 border-2 border-dashed border-accent/30 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <p className="text-muted-foreground">{emptyMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl tracking-tighter">{title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all hover:border-accent/50">
                {item.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </div>
                      {item.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.readTime}
                        </div>
                      )}
                    </div>
                    {item.link && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}