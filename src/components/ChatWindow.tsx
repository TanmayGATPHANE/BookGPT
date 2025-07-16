import { useRef, useEffect, useState } from 'react';
import { MessageInput } from './MessageInput';
import { useApp } from '../context/AppContext';

interface ChatWindowProps {
  initialMessage?: string;
  isLoading?: boolean;
  isSidebarCollapsed?: boolean;
}

export function ChatWindow({ initialMessage, isLoading = false, isSidebarCollapsed = false }: ChatWindowProps) {
  const { messages, selectedBook, addMessage } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setHasInteracted(true);
    }
  }, [initialMessage]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const behavior = messages.length <= 1 ? "auto" : "smooth";
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM updates are complete
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleUserMessage = async (message: string) => {
    setHasInteracted(true);
    addMessage(message, false);
    // Set loading state
    setTimeout(() => {
      addMessage("Let me help you analyze that aspect of the book...", true);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col h-full">
      {/* Messages Area */}
      {messages.length > 0 && (
        <div className="flex-1 space-y-4 mb-24">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
            >
              {message.isAI && (
                <div className="w-8 h-8 mr-3 flex-shrink-0">
                  <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" 
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              )}
              <div className={`max-w-[80%] ${message.isAI ? 'bg-white' : 'bg-orange-50'} 
                            rounded-lg p-4 shadow-sm animate-fade-in-up`}
                   style={{ animationDelay: `${index * 100}ms` }}>
                <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 mr-3 flex-shrink-0">
                <div className="w-full h-full bg-orange-100 rounded-full animate-pulse flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500 animate-spin-slow" 
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </div>
              </div>
              <div className="max-w-[80%] bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      )}

      {/* Input Area */}
      <div className={`${messages.length > 0 ? 'fixed bottom-0 right-0 left-0 p-4 bg-gradient-to-t from-[#fff6e5] via-[#fff6e5] to-transparent' : ''} 
                    transition-all duration-300`}
           style={{ 
             left: messages.length > 0 ? `${isSidebarCollapsed ? '80px' : '320px'}` : 'auto',
           }}>
        <div className={`mx-auto ${messages.length > 0 ? 'max-w-3xl w-full' : 'w-full'}`}>
          <MessageInput 
            onSendMessage={handleUserMessage} 
            placeholder="Ask anything about the book..."
            className={`${messages.length > 0 ? 'bg-white/95' : 'bg-white'} shadow-lg border-orange-100`}
          />
        </div>
      </div>
    </div>
  );
}
