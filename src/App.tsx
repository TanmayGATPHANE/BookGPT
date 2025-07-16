import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BookSelector } from './components/BookSelector';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { SignIn } from './components/SignIn';
import { UserProfile } from './components/UserProfile';
import './styles/index.css';

function AppContent() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { selectedBook, setSelectedBook, addMessage, messages, user } = useApp();
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Show sign-in page if user is not authenticated
  if (!user) {
    return <SignIn />;
  }

  // Common collapse button component
  const CollapseButton = ({ isCollapsed, onClick, title, className = "" }: {
    isCollapsed: boolean;
    onClick: () => void;
    title: string;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`w-6 h-8 rounded-md bg-white/80 hover:bg-orange-50 border border-orange-200 
                 hover:border-orange-300 shadow-sm hover:shadow-md transition-all duration-200 
                 flex items-center justify-center text-orange-600 hover:text-orange-700 ${className}`}
      title={title}
    >
      <svg 
        className="w-6 h-4 transition-transform duration-200"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} 
        />
      </svg>
    </button>
  );

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-amber-50 flex page-load-animation">
      {/* Global Background Animation - Always Present */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-25 to-amber-50 animate-gradient-shift"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-10 left-10 w-6 h-6 text-orange-200 animate-float-slow">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div className="absolute top-32 right-20 w-8 h-8 text-orange-150 animate-float-reverse">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>
        <div className="absolute bottom-20 left-1/4 w-5 h-5 text-orange-100 animate-float-delayed">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
        </div>
        <div className="absolute top-1/2 right-10 w-7 h-7 text-orange-200 animate-float-slow">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-200 rounded-full animate-float-particle"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-100 rounded-full animate-float-particle-delayed"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-orange-300 rounded-full animate-float-particle-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-orange-150 rounded-full animate-float-particle-reverse"></div>
        <div className="absolute top-1/6 left-1/2 w-2 h-2 bg-orange-200 rounded-full animate-float-particle"></div>
        <div className="absolute bottom-1/2 right-1/6 w-1 h-1 bg-orange-300 rounded-full animate-float-particle-delayed"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/3 right-10 w-12 h-12 border border-orange-100 rotate-45 animate-float-geometric"></div>
        <div className="absolute bottom-1/4 left-10 w-8 h-8 border border-orange-150 rounded-full animate-float-geometric-delayed"></div>
        <div className="absolute top-2/3 left-1/2 w-6 h-6 bg-orange-50 transform rotate-45 animate-float-geometric-slow"></div>
        <div className="absolute bottom-1/6 right-1/2 w-10 h-10 border border-orange-200 rounded-full animate-float-geometric"></div>
        
        {/* Additional Book-related Icons */}
        <div className="absolute top-1/5 left-1/4 w-5 h-5 text-orange-150 animate-float-delayed">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"/></svg>
        </div>
        <div className="absolute bottom-1/5 right-1/4 w-6 h-6 text-orange-100 animate-float-reverse">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-25/30 to-transparent animate-shimmer"></div>
      </div>

      {/* Collapsible Sidebar */}
      <div className={`fixed left-0 top-0 h-screen z-40 bg-white/90 backdrop-blur-sm shadow-lg border-r border-orange-200/50 
                    transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-16' : 'w-80'}`}>
        <div className="h-full flex flex-col">
          {/* Book Selection Area */}
          <div className="p-4 flex-1 overflow-y-auto overflow-x-visible">
            {selectedBook ? (
              <div className="space-y-4">
                {isSidebarCollapsed ? (
                  /* Collapsed State - Only show collapse button */
                  <div className="flex justify-center pt-4">
                    <CollapseButton 
                      isCollapsed={true}
                      onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                      title="Expand sidebar"
                    />
                  </div>
                ) : (
                  /* Expanded State - Show book icon and collapse button */
                  <div className="space-y-4">
                    {/* Header with book icon and collapse button */}
                    <div className="flex items-center justify-between pb-4 border-b border-orange-100">
                      <div 
                        className="cursor-pointer group flex items-center space-x-3"
                        onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden transform transition-all duration-300 shadow-lg group-hover:scale-95">
                          <img 
                            src={selectedBook.coverImage} 
                            alt={selectedBook.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to letter icon if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center 
                                        text-lg font-semibold text-white" style={{ display: 'none' }}>
                            {selectedBook.title[0].toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 leading-tight">{selectedBook.title}</h3>
                          <p className="text-sm text-gray-600">{selectedBook.author}</p>
                        </div>
                      </div>
                      
                      <CollapseButton 
                        isCollapsed={false}
                        onClick={() => {
                          setSidebarCollapsed(!isSidebarCollapsed);
                        }}
                        title="Collapse sidebar"
                      />
                    </div>
                  </div>
                )}

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
                            selectedBook.title === "The 7Ms of Digital Transformation" ?
                            "The Ultimate Digital Transformation Playbook covering Meanings, Mission, Motivation, Mindset Shifts, Methodologies, Measurements, and Money - essential elements for successful digital transformation." :
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
                          ) : selectedBook.title === "The 7Ms of Digital Transformation" ? (
                            <>
                              <li>• Digital Strategy</li>
                              <li>• Organizational Change</li>
                              <li>• Technology Implementation</li>
                              <li>• Business Transformation</li>
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
              /* Homepage - No book selected */
              <div>
                {isSidebarCollapsed ? (
                  /* Collapsed State - Only show collapse button */
                  <div className="flex justify-center pt-4">
                    <CollapseButton 
                      isCollapsed={true}
                      onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                      title="Expand sidebar"
                    />
                  </div>
                ) : (
                  /* Expanded State - Show book selection with collapse button */
                  <div className="space-y-6">
                    {/* Header with app icon and collapse button */}
                    <div className="flex items-center justify-between pt-4 pb-4 border-b border-orange-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent leading-tight">Choose Your Book</h2>
                          <p className="text-sm text-gray-600">Select a book & start exploring</p>
                        </div>
                      </div>
                      
                      <CollapseButton 
                        isCollapsed={false}
                        onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                        title="Collapse sidebar"
                      />
                    </div>
                    
                    {/* Book Selector */}
                    <BookSelector />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-80'}`}>
        {/* Top Header with User Profile */}
        <div className="fixed top-0 right-0 z-30 p-4" style={{ 
          left: isSidebarCollapsed ? '64px' : '320px',
        }}>
          <div className="flex justify-end">
            <UserProfile />
          </div>
        </div>

        <div className="chat-container relative h-screen flex flex-col pt-16">
          {!selectedBook ? (
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              {/* Enhanced Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Floating Book Icons - simplified without mouse interaction */}
                <div className="absolute top-10 left-10 animate-float-slow opacity-8">
                  <svg className="w-8 h-8 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="absolute top-32 right-20 animate-float-delayed opacity-6">
                  <svg className="w-12 h-12 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"/>
                  </svg>
                </div>
                <div className="absolute bottom-20 left-1/4 animate-float-reverse opacity-4">
                  <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div className="absolute top-1/2 right-10 animate-float-slow opacity-8">
                  <svg className="w-10 h-10 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>

                {/* Additional floating elements */}
                <div className="absolute top-1/4 left-1/3 animate-float-delayed opacity-6">
                  <svg className="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="absolute bottom-1/3 right-1/4 animate-float-reverse opacity-4">
                  <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div className="absolute top-2/3 left-1/6 animate-float-slow opacity-6">
                  <svg className="w-9 h-9 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                </div>

                {/* Subtle Particle Animation */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute rounded-full animate-particle-float ${
                        i % 3 === 0 ? 'w-1 h-1 bg-orange-200' :
                        i % 3 === 1 ? 'w-2 h-2 bg-orange-300' :
                        'w-1.5 h-1.5 bg-orange-400'
                      }`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                        opacity: 0.08 + Math.random() * 0.1
                      }}
                    />
                  ))}
                </div>

                {/* Geometric shapes */}
                <div className="absolute top-1/5 right-1/3 animate-float-delayed opacity-3">
                  <div className="w-16 h-16 border-2 border-orange-300 rounded-full animate-spin-slow"></div>
                </div>
                <div className="absolute bottom-1/4 left-1/5 animate-float-reverse opacity-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-lg transform rotate-45 animate-pulse-gentle"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 animate-float-slow opacity-3">
                  <div className="w-20 h-20 border border-orange-400 rounded-full animate-spin-slow"></div>
                </div>

                {/* Subtle gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-orange-100/15 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-50/10 to-transparent animate-gradient-shift" style={{ animationDelay: '4s' }}></div>
              </div>

              {/* Main Content */}
              <div className="text-center max-w-2xl mx-auto px-4 relative z-10">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-4">
                  Welcome to Book Chat
                </h1>
                <p className="text-orange-600 text-lg mb-6">
                  Select a book from the sidebar to start exploring
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full">
              {/* Initial View - Only shown when no messages */}
              {!inputMessage && !isLoading && (
                <div className="flex-1 flex items-center justify-center relative z-10">
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

