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
