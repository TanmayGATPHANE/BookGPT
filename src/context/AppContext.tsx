import { createContext, useContext, useState, ReactNode } from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
}

export interface Message {
  id: number;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

interface AppContextType {
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  messages: Message[];
  addMessage: (content: string, isAI: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const SAMPLE_BOOKS: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://example.com/gatsby.jpg"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://example.com/1984.jpg"
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://example.com/pride.jpg"
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (content: string, isAI: boolean) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content,
      isAI,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <AppContext.Provider value={{
      selectedBook,
      setSelectedBook,
      messages,
      addMessage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
