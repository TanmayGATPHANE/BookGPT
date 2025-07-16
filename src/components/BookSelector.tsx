import { SAMPLE_BOOKS } from '../context/AppContext';
import { useApp } from '../context/AppContext';

export function BookSelector() {
  const { setSelectedBook, selectedBook } = useApp();

  return (
    <div className="space-y-4">
      {SAMPLE_BOOKS.map((book, index) => (
        <div
          key={book.id}
          className={`p-5 rounded-xl bg-white/90 backdrop-blur-sm transition-all duration-300 
                     hover:shadow-lg cursor-pointer border border-orange-100
                     hover:border-orange-300 book-selector-enhanced
                     book-item-stagger group
            ${selectedBook?.id === book.id ? 'ring-2 ring-orange-500 shadow-lg bg-orange-50' : ''}`}
          onClick={() => setSelectedBook(book)}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
              <span className="text-2xl font-bold text-orange-500">{book.title[0]}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
