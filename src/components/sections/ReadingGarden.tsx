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

                {/* Single Book Summary Display */}
                {selectedBook && (
                  <div className="mt-12 mx-auto max-w-4xl">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-bold text-foreground">
                        {selectedBook.title}
                      </h2>
                      <p className="text-xl">
                        <span style={{ color: '#999999' }}>By: {selectedBook.author}</span> - <span style={{ color: '#676767' }}>Read: {selectedBook.date} - Rating: {selectedBook.rating === 0 ? 'N/A' : `${selectedBook.rating}/10`}</span>
                      </p>
                      <div className="max-w-3xl mx-auto">
                        <div className="text-muted-foreground leading-relaxed text-left space-y-4">
                          {selectedBook.description.split('\n\n').map((paragraph, index) => (
                            <p key={index}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                              {/* Divider below bookshelf */}
              {!selectedBook && (
                <div className="mt-16 mx-auto max-w-4xl">
                  <div className="border-t mb-12" style={{ borderColor: '#E5E5E5' }}></div>
                </div>
              )}

              {/* All Reviews Display - when no book is selected */}
              {!selectedBook && (
                <div className="mx-auto max-w-4xl space-y-12">
                  {[...items].sort((a, b) => b.rating - a.rating).map((book, index) => (
                      <div key={book.id}>
                        {/* Review Card */}
                        <div className="flex gap-8 items-start">
                          {/* Book Cover */}
                          <div className="flex-shrink-0">
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-32 h-42 object-cover rounded-lg shadow-md"
                            />
                          </div>

                          {/* Review Content */}
                          <div className="flex-1 space-y-4">
                            {/* Title and Metadata */}
                            <div>
                              <h2 
                                className="text-2xl font-bold text-foreground mb-2 cursor-pointer hover:text-accent border-b-2 border-transparent hover:border-black inline-block"
                                onClick={() => handleBookClick(book)}
                              >
                                {book.title}
                              </h2>
                              <p className="text-lg mb-1" style={{ color: '#999999' }}>
                                {book.author}
                              </p>
                              <p className="text-sm" style={{ color: '#676767' }}>
                                Read: {book.date} • Rating: {book.rating === 0 ? 'N/A' : `${book.rating}/10`}
                              </p>
                            </div>

                            {/* Review Text */}
                            <div className="text-muted-foreground leading-relaxed space-y-4">
                              {book.description.split('\n\n').map((paragraph, paragraphIndex) => (
                                <p key={paragraphIndex}>
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Divider - don't show after last item */}
                        {index < items.length - 1 && (
                          <div className="mt-12 border-t" style={{ borderColor: '#E5E5E5' }}></div>
                        )}
                      </div>
                    ))}
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