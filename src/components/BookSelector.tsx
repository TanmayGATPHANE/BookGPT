import { SAMPLE_BOOKS } from '../context/AppContext';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import React from 'react';

export function BookSelector() {
  const { setSelectedBook, selectedBook } = useApp();
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (book: { id: number }, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 16, // 16px to the right of the book item
      y: rect.top
    });
    setHoveredBook(book.id);
    console.log('Mouse entered book:', book.id);
  };

  const handleMouseLeave = (bookId: number) => {
    setHoveredBook(null);
    console.log('Mouse left book:', bookId);
  };

  return (
    <div className="space-y-4 relative">
      {SAMPLE_BOOKS.map((book) => (
        <div
          key={book.id}
          className="relative"
          onMouseEnter={(e) => handleMouseEnter(book, e)}
          onMouseLeave={() => handleMouseLeave(book.id)}
        >
          <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedBook?.id === book.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
            }`}
            onClick={() => setSelectedBook(book)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
              <svg
                className="w-5 h-5 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          
          {/* Hover Tooltip */}
          {hoveredBook === book.id && (
            <div 
              className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 animate-fade-in"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`
              }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded"
                    onError={(e) => {
                      console.log('Image failed to load:', book.coverImage);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">{book.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-xs text-gray-700 line-clamp-4">{book.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
