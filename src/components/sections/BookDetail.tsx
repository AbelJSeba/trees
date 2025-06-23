import { ArrowLeft, Calendar, Clock, Star, User } from 'lucide-react';
import { ReadingItem } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

interface BookDetailProps {
  book: ReadingItem;
  onBack: () => void;
}

export function BookDetail({ book, onBack }: BookDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reading Garden
            </button>

            {/* Book Header */}
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {/* Book Cover */}
              <div className="md:col-span-1">
                <div className="aspect-[3/4] w-full max-w-sm mx-auto">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Book Information */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl mb-4" style={{ color: '#999999' }}>
                    by {book.author}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                                          {book.rating === 0 ? (
                        <span className="text-sm" style={{ color: '#676767' }}>No rating given</span>
                      ) : (
                        <>
                          <div className="flex items-center">
                            {[...Array(10)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < book.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm" style={{ color: '#676767' }}>
                            {book.rating}/10
                          </span>
                        </>
                      )}
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-6" style={{ color: '#676767' }}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Read: {book.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{book.readTime}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Notes */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-foreground">
                  My Reading Notes
                </h2>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">About the Author</h3>
                    <p className="text-muted-foreground text-sm">
                      Author, thinker, and subject matter expert. {book.author} has contributed 
                      significantly to the understanding of topics in {book.tags.slice(0, 2).join(', ')}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 