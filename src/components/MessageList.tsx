// src/components/MessageList.tsx
import { Message } from '@/lib/types';
import ChatBubble from './ChatBubble';
import { useEffect, useRef } from 'react';

type Props = {
  messages: Message[];
  isLoading: boolean;
};

export default function MessageList({ messages, isLoading }: Props) {
  // Create a ref to attach to the bottom of the message list
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // This function scrolls the view to the ref's position
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // This effect runs whenever the 'messages' array changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6 space-y-6 bg-gradient-to-b from-gray-900/50 to-gray-900/90 backdrop-blur-sm">
      {messages.length === 1 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm max-w-md">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-2xl font-bold">AI</span>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Welcome to CryptoChat</h2>
            <p className="text-gray-300">Ask me anything about cryptocurrencies, market trends, or trading advice.</p>
          </div>
        </div>
      )}
      
      {messages.length > 1 && messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
      
      {isLoading && (
        <ChatBubble message={{ id: 'loading', author: 'bot', content: (
          <div className="flex items-center space-x-2">
            <span>Thinking</span>
            <span className="flex space-x-1">
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </span>
          </div>
        ) }} />
      )}
      
      {/* This empty div is our invisible target to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
}