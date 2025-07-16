import { createContext, useContext, useState, ReactNode } from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
}

export interface Message {
  id: number;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppContextType {
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  messages: Message[];
  addMessage: (content: string, isAI: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const SAMPLE_BOOKS: Book[] = [
  {
    id: 2,
    title: "The 7Ms of Digital Transformation",
    author: "Arindam Dutta",
    coverImage: "/images/7m-clear.png",
    description: "A comprehensive guide to digital transformation through seven essential methodologies. Learn how to navigate the digital landscape and transform your business with proven strategies."
  },
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "/images/gatsby.svg",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway."
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "/images/pride-prejudice.svg",
    description: "A timeless romance following Elizabeth Bennet and Mr. Darcy as they navigate social expectations, personal growth, and the complexities of love in Regency England."
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addMessage = (content: string, isAI: boolean) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content,
      isAI,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with real authentication logic
    if (email && password) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Allow demo login or any email/password combination for demo purposes
      let userName = email.split('@')[0].replace(/[._]/g, ' ');
      
      // Special handling for demo account
      if (email === 'demo@bookgpt.com' && password === 'demo123') {
        userName = 'Demo User';
      }
      
      // Mock user data
      const mockUser: User = {
        id: Date.now().toString(),
        name: userName.replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=fb923c&color=fff&size=32`
      };
      
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    setSelectedBook(null);
    setMessages([]);
  };

  return (
    <AppContext.Provider value={{
      selectedBook,
      setSelectedBook,
      messages,
      addMessage,
      user,
      setUser,
      signIn,
      signOut
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
