import { useState } from 'react';
import { ReadingItem } from '../../types';
import { Bookshelf } from './Bookshelf';

interface ReadingGardenProps {
  title: string;
  description: string;
  items: ReadingItem[];
  emptyMessage: string;
}

export function ReadingGarden({ title, description, items, emptyMessage }: ReadingGardenProps) {
  const [selectedBook, setSelectedBook] = useState<ReadingItem | null>(null);

  const handleBookClick = (book: ReadingItem) => {
    if (selectedBook?.id === book.id) {
      setSelectedBook(null); // Deselect if same book clicked
    } else {
      setSelectedBook(book);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-medium text-accent mb-4">{title}</h1>
            </div>

            {/* Bookshelf */}
            {items.length > 0 ? (
              <div className="relative">
                {/* Clean Bookshelf */}
                <div className="mx-auto max-w-6xl">
                  <Bookshelf books={items} onBookClick={handleBookClick} selectedBook={selectedBook} />
                </div>

                {/* Book Summary Display */}
                {selectedBook && (
                  <div className="mt-12 mx-auto max-w-4xl">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-bold text-foreground">
                        {selectedBook.title}
                      </h2>
                      <p className="text-xl text-muted-foreground">
                        By: {selectedBook.author} - Read: {selectedBook.date} - Rating: {selectedBook.rating}/10
                      </p>
                      <div className="max-w-3xl mx-auto">
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedBook.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-4 text-muted-foreground text-4xl">📚</div>
                <p className="text-muted-foreground">
                  {emptyMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 