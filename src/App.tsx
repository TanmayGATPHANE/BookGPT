import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BookSelector } from './components/BookSelector';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import './styles/index.css';

function AppContent() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { selectedBook, setSelectedBook, addMessage, messages } = useApp();
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAction = async (prompt: string) => {
    if (selectedBook) {
      setInputMessage(prompt);
      addMessage(prompt, false);
      setIsLoading(true);
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      addMessage("Let me help you analyze that aspect of the book...", true);
    }
  };

  const suggestions = [
    { title: "Plot Analysis", desc: "Examine story structure and events" },
    { title: "Character Study", desc: "Explore major characters" },
    { title: "Theme Analysis", desc: "Discover key themes" },
    { title: "Writing Style", desc: "Analyze literary techniques" }
  ];
  
  // Sample chat history (static for now)
  const chatHistory = [
    { date: "Today", chats: [
      { title: "Plot Analysis Discussion", time: "2:30 PM" },
      { title: "Character Study: Main Protagonist", time: "1:15 PM" }
    ]},
    { date: "Yesterday", chats: [
      { title: "Theme Analysis: Symbolism", time: "4:45 PM" },
      { title: "Writing Style Discussion", time: "3:20 PM" }
    ]}
  ];
  
  return (
    <div className="min-h-screen bg-gradient-bg flex">
      {/* Collapsible Sidebar */}
      <div className={`fixed left-0 top-0 h-screen z-40 bg-white/95 backdrop-blur-sm shadow-lg border-r border-orange-100 
                    transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-80'}`}>
        <div className="h-full flex flex-col">
          {/* Book Selection Area */}
          <div className="p-4 flex-1 overflow-y-auto">
            {selectedBook ? (
              <div className="space-y-4">
                {/* Book Header - Clickable to toggle sidebar */}
                <div 
                  className="cursor-pointer text-center group pb-4 border-b border-orange-100"
                  onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-orange-100 flex items-center justify-center 
                               text-2xl font-semibold transform transition-all duration-300
                               ${!isSidebarCollapsed ? 'mb-4 group-hover:scale-95' : 'group-hover:scale-105'}`}>
                    {selectedBook.title[0].toUpperCase()}
                  </div>
                  {!isSidebarCollapsed && (
                    <>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedBook.title}</h3>
                      <p className="text-sm text-gray-600">{selectedBook.author}</p>
                    </>
                  )}
                </div>

                {/* Book Details and History - Only visible when sidebar is expanded */}
                {!isSidebarCollapsed && (
                  <div className="space-y-6">
                    {/* Book Details Section */}
                    <div className="space-y-4 text-sm px-2 pb-4 border-b border-orange-100">
                      <div>
                        <h4 className="font-semibold text-orange-900 mb-2">Quick Summary</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedBook.title === "The Great Gatsby" ? 
                            "A tale of wealth, love, and the American Dream in the Roaring Twenties. Jay Gatsby's pursuit of Daisy Buchanan reveals the hollow nature of materialism and social status." :
                            "A captivating story that explores themes of human nature, society, and personal transformation."}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-orange-900 mb-2">Key Themes</h4>
                        <ul className="space-y-1 text-gray-600">
                          {selectedBook.title === "The Great Gatsby" ? (
                            <>
                              <li>• The American Dream</li>
                              <li>• Wealth and Society</li>
                              <li>• Love and Romance</li>
                              <li>• Past and Nostalgia</li>
                            </>
                          ) : (
                            <>
                              <li>• Identity and Growth</li>
                              <li>• Society and Class</li>
                              <li>• Human Nature</li>
                              <li>• Personal Journey</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Chat History Section */}
                    <div className="space-y-4 text-sm px-2">
                      <h4 className="font-semibold text-orange-900 mb-3">Chat History</h4>
                      {chatHistory.map((day, index) => (
                        <div key={index} className="space-y-2">
                          <h5 className="text-xs font-medium text-gray-500">{day.date}</h5>
                          {day.chats.map((chat, chatIndex) => (
                            <div
                              key={chatIndex}
                              className="p-2 rounded hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                            >
                              <p className="text-gray-800 font-medium">{chat.title}</p>
                              <p className="text-xs text-gray-500">{chat.time}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Change Book Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSidebarCollapsed(false);
                        setSelectedBook(null);
                      }}
                      className="w-full py-2 px-4 mt-4 bg-orange-50 hover:bg-orange-100 
                               text-orange-600 rounded-lg transition-all duration-300
                               border border-orange-200 hover:border-orange-300"
                    >
                      Change Book
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={isSidebarCollapsed ? 'hidden' : ''}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Book</h2>
                  <p className="text-sm text-gray-600 mb-6">Select a book to start exploring</p>
                </div>
                <BookSelector />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
        <div className="chat-container relative h-screen flex flex-col">
          {!selectedBook ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-orange-900 mb-4">
                  Welcome to Book Chat
                </h1>
                <p className="text-orange-600 text-lg mb-6">
                  Select a book from the sidebar to start exploring
                </p>
                <div className="w-16 h-16 mx-auto rounded-xl bg-orange-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full">
              {/* Initial View - Only shown when no messages */}
              {!inputMessage && !isLoading && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-2xl px-4 space-y-8">
                    {/* Welcome Message */}
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-orange-900 mb-2">
                        Explore {selectedBook.title}
                      </h2>
                      <p className="text-orange-600">
                        Ask anything about the book or try these suggestions
                      </p>
                    </div>

                    {/* Suggestions Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {suggestions.map((item, index) => (
                        <button
                          key={item.title}
                          onClick={() => handleQuickAction(`Analyze the ${item.title.toLowerCase()} in ${selectedBook.title}`)}
                          className="text-left p-4 rounded-lg bg-orange-50/80 hover:bg-orange-100 
                                   transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md
                                   group border border-orange-100 animate-fade-in-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <h3 className="font-semibold text-orange-900 mb-1 group-hover:text-orange-700">
                            {item.title}
                          </h3>
                          <p className="text-sm text-orange-600 group-hover:text-orange-500">
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="pt-4">
                      <MessageInput 
                        onSendMessage={handleQuickAction}
                        placeholder="Ask anything about the book..."
                        className="bg-white shadow-lg border-orange-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Window - Only shown when there are messages */}
              {(inputMessage || isLoading || messages.length > 0) && (
                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-3xl mx-auto px-4 py-4">
                    <ChatWindow 
                      initialMessage={inputMessage} 
                      isLoading={isLoading}
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

