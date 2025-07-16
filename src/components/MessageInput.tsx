import { useState, KeyboardEvent } from 'react';

export interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  className?: string;
}

export function MessageInput({ onSendMessage, placeholder = 'Type your message...', className = '' }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex items-end space-x-2 rounded-lg border p-3 ${className}`}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 bg-transparent resize-none outline-none min-h-[44px] max-h-[200px] py-2 px-3"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`px-4 py-2 rounded-lg transition-all duration-200 
                   ${message.trim() 
                     ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                     : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
  );
}
