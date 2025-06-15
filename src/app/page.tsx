// src/app/page.tsx
"use client";

import ChatInput from '@/components/ChatInput';
import MessageList from '@/components/MessageList';
import PriceChart from '@/components/PriceChart';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'; // 1. Import the hook
import { speak } from '@/lib/speak';
import { Message } from '@/lib/types';
import { FormEvent, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      author: 'bot',
      content: 'Hello! Click the microphone to ask a question with your voice.',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sessionIdRef = useRef<string | null>(null);

  // 2. Use the speech recognition hook
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();

  // 3. This effect links the voice transcript to the input field
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Stop listening if microphone is active when submitting
    if (isListening) {
      stopListening();
    }

    const userInput: Message = { id: Date.now().toString(), author: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userInput]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId: sessionIdRef.current }),
      });

      if (!response.ok) { throw new Error('Network response was not ok'); }
      const data = await response.json();
      sessionIdRef.current = data.sessionId;
      let botResponse: Message;

      if (data.type === 'chart') {
        botResponse = {
          id: Date.now().toString() + 'bot',
          author: 'bot',
          content: (<div><p>OK. Here is the 7 day chart data.</p><PriceChart data={data.content} /></div>),
        };
        speak("Here is the 7 day chart data especially crafted for you")
      } else {
        botResponse = { id: Date.now().toString() + 'bot', author: 'bot', content: data.content };
        speak(data.content);
      }
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Failed to get response from backend:", error);
      const errorResponse: Message = { id: Date.now().toString() + 'error', author: 'bot', content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later." };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white animate-gradient">
      <div className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl animate-gradient">
        <div className="flex flex-col w-full h-[90vh] bg-gray-900 rounded-xl overflow-hidden glass shadow-modern">
          <div className="p-4 bg-gray-800/50 border-b border-gray-700/50 flex items-center justify-between glass">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CryptoChat AI</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
          <MessageList messages={messages} isLoading={isLoading} />
          <ChatInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isListening={isListening}
            startListening={startListening}
            stopListening={stopListening}
          />
        </div>
      </div>
    </main>
  );
}