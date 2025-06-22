import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadingItem } from '../../types';

interface BookshelfProps {
  books: ReadingItem[];
  onBookClick?: (book: ReadingItem) => void;
  selectedBook?: ReadingItem | null;
}

export function Bookshelf({ books, onBookClick, selectedBook }: BookshelfProps) {
  const selectedBookIndex = selectedBook ? books.findIndex(book => book.id === selectedBook.id) : -1;
  const [scroll, setScroll] = useState(-200);
  const [isScrolling, setIsScrolling] = useState(false);
  const [booksInViewport, setBooksInViewport] = useState(0);

  const bookshelfRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollRightRef = useRef<HTMLDivElement>(null);
  const scrollLeftRef = useRef<HTMLDivElement>(null);

  // Book dimensions (matching original)
  const VISIBLE_BOOKS = 11;
  const width = 41.5;
  const height = 220;
  const gap = 4; // gap-1 in Tailwind
  
  const spineWidth = `${width}px`;
  const coverWidth = `${width * 4}px`;
  const bookWidth = `${width * 5}px`;
  const bookHeight = `${height}px`;
  
  // Fixed viewport width for exactly 11 books
  const viewportWidth = VISIBLE_BOOKS * width + (VISIBLE_BOOKS - 1) * gap;

  const minScroll = 0;
  const maxScroll = React.useMemo(() => {
    // Calculate max scroll to ensure we always show 11 books
    // We want to stop scrolling when the last book reaches the right edge of the viewport
    const totalBooksWidth = books.length * (width + gap);
    const maxScrollPosition = Math.max(0, totalBooksWidth - viewportWidth);
    
    // Add extra scroll space if a book is selected
    const selectedBookExtra = selectedBookIndex > -1 ? width * 4 : 0;
    
    return maxScrollPosition + selectedBookExtra;
  }, [selectedBookIndex, books.length, viewportWidth]);

  const boundedScroll = (scrollX: number) => {
    setScroll(Math.max(minScroll, Math.min(maxScroll, scrollX)));
  };

  const boundedRelativeScroll = useCallback(
    (incrementX: number) => {
      setScroll((_scroll) =>
        Math.max(minScroll, Math.min(maxScroll, _scroll + incrementX))
      );
    },
    [maxScroll]
  );

  // Handle book selection
  const handleBookClick = (index: number) => {
    onBookClick?.(books[index]);
  };

  // Set fixed viewport size
  useEffect(() => {
    setBooksInViewport(VISIBLE_BOOKS);
  }, []);

  // Auto-scroll to selected book
  useEffect(() => {
    if (selectedBookIndex === -1) {
      boundedRelativeScroll(0);
    } else {
      boundedScroll((selectedBookIndex - (booksInViewport - 4.5) / 2) * (width + 11));
    }
  }, [selectedBookIndex, boundedRelativeScroll, booksInViewport]);

  // Scroll handlers
  useEffect(() => {
    const currentScrollRightRef = scrollRightRef.current;
    const currentScrollLeftRef = scrollLeftRef.current;

    let scrollInterval: number | null = null;

    const setScrollRightInterval = () => {
      setIsScrolling(true);
      scrollInterval = setInterval(() => {
        boundedRelativeScroll(3);
      }, 10);
    };

    const setScrollLeftInterval = () => {
      setIsScrolling(true);
      scrollInterval = setInterval(() => {
        boundedRelativeScroll(-3);
      }, 10);
    };

    const clearScrollInterval = () => {
      setIsScrolling(false);
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };

    if (currentScrollRightRef && currentScrollLeftRef) {
      currentScrollRightRef.addEventListener('mouseenter', setScrollRightInterval);
      currentScrollRightRef.addEventListener('mouseleave', clearScrollInterval);
      currentScrollLeftRef.addEventListener('mouseenter', setScrollLeftInterval);
      currentScrollLeftRef.addEventListener('mouseleave', clearScrollInterval);

      // Touch events
      currentScrollRightRef.addEventListener('touchstart', setScrollRightInterval);
      currentScrollRightRef.addEventListener('touchend', clearScrollInterval);
      currentScrollLeftRef.addEventListener('touchstart', setScrollLeftInterval);
      currentScrollLeftRef.addEventListener('touchend', clearScrollInterval);
    }

    return () => {
      clearScrollInterval();
      if (currentScrollRightRef && currentScrollLeftRef) {
        currentScrollRightRef.removeEventListener('mouseenter', setScrollRightInterval);
        currentScrollRightRef.removeEventListener('mouseleave', clearScrollInterval);
        currentScrollLeftRef.removeEventListener('mouseenter', setScrollLeftInterval);
        currentScrollLeftRef.removeEventListener('mouseleave', clearScrollInterval);
        currentScrollRightRef.removeEventListener('touchstart', setScrollRightInterval);
        currentScrollRightRef.removeEventListener('touchend', clearScrollInterval);
        currentScrollLeftRef.removeEventListener('touchstart', setScrollLeftInterval);
        currentScrollLeftRef.removeEventListener('touchend', clearScrollInterval);
      }
    };
  }, [boundedRelativeScroll]);

  return (
    <>
      {/* SVG Paper Texture Filter */}
      <svg className="absolute inset-0 invisible">
        <defs>
          <filter id="paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={8}
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="white"
              surfaceScale="1"
              result="diffLight"
            >
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>

      <div className="relative mx-auto" ref={bookshelfRef} style={{ width: `${viewportWidth + 80}px` }}>
        {/* Left Scroll Arrow */}
        <div
          className={`absolute left-0 h-full ${
            scroll > minScroll ? 'block' : 'hidden'
          }`}
          style={{ top: '0' }}
        >
          <div
            ref={scrollLeftRef}
            className="flex items-center justify-center h-full w-8 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </div>
        </div>

        {/* Bookshelf Viewport */}
        <div
          ref={viewportRef}
          className="flex items-center gap-1 overflow-hidden cursor-grab select-none"
          style={{
            width: `${viewportWidth}px`,
            margin: '0 auto',
            marginLeft: '40px',
            marginRight: '40px'
          }}
        >
          {books.map((book, index) => {
            const isSelected = selectedBookIndex === index;
            
            return (
              <button
                key={book.id}
                onClick={() => handleBookClick(index)}
                className="flex flex-row items-center justify-start outline-none flex-shrink-0 gap-0 focus:outline-none"
                style={{
                  transform: `translateX(-${scroll}px)`,
                  width: isSelected ? bookWidth : spineWidth,
                  perspective: '1000px',
                  WebkitPerspective: '1000px',
                  transition: isScrolling
                    ? 'transform 100ms linear'
                    : 'all 500ms ease',
                  willChange: 'auto',
                }}
              >
                {/* Book Spine */}
                <div
                  className="flex items-start justify-center flex-shrink-0"
                  style={{
                    width: spineWidth,
                    height: bookHeight,
                    transformOrigin: 'right',
                    backgroundColor: book.spineColor,
                    color: book.textColor,
                    transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${
                      isSelected ? '-60deg' : '0deg'
                    }) rotateZ(0deg) skew(0deg, 0deg)`,
                    transition: 'all 500ms ease',
                    willChange: 'auto',
                    filter: 'brightness(0.8) contrast(2)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Paper Texture Overlay */}
                  <span
                    className="pointer-events-none fixed top-0 left-0 z-50 opacity-40"
                    style={{
                      height: bookHeight,
                      width: spineWidth,
                      filter: 'url(#paper)',
                    }}
                  />
                  {/* Spine Title */}
                  <h2
                    className="mt-3 text-xs font-medium select-none overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{
                      writingMode: 'vertical-rl',
                      maxHeight: `${height - 24}px`,
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    {book.title}
                  </h2>
                </div>

                {/* Book Cover */}
                <div
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{
                    transformOrigin: 'left',
                    transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${
                      isSelected ? '30deg' : '88.8deg'
                    }) rotateZ(0deg) skew(0deg, 0deg)`,
                    transition: 'all 500ms ease',
                    willChange: 'auto',
                    filter: 'brightness(0.8) contrast(2)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Paper Texture Overlay */}
                  <span
                    className="pointer-events-none fixed top-0 right-0 z-50 opacity-40"
                    style={{
                      height: bookHeight,
                      width: coverWidth,
                      filter: 'url(#paper)',
                    }}
                  />
                  {/* Gradient Overlay for depth */}
                  <span
                    className="pointer-events-none absolute top-0 left-0 z-50"
                    style={{
                      height: bookHeight,
                      width: coverWidth,
                      background: `linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)`,
                    }}
                  />
                  {/* Book Cover Image */}
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="transition-all duration-500"
                    style={{
                      width: coverWidth,
                      height: bookHeight,
                      willChange: 'auto',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Arrow */}
        <div
          className={`absolute right-0 h-full top-0 ${
            scroll < maxScroll ? 'block' : 'hidden'
          }`}
        >
          <div
            ref={scrollRightRef}
            className="flex items-center justify-center h-full w-8 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </div>
    </>
  );
} 