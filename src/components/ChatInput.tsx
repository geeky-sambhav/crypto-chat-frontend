// src/components/ChatInput.tsx
import { FormEvent } from 'react';
import { Mic, Send, MicOff } from 'lucide-react';
import clsx from 'clsx';

type Props = {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  // New props for voice input
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
};

export default function ChatInput({ input, setInput, handleSubmit, isLoading, isListening, startListening, stopListening }: Props) {
  return (
    <div className="p-4 border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crypto..."
            className="w-full p-3 pl-4 pr-10 rounded-xl bg-gray-800/80 text-white border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 placeholder-gray-400 shadow-inner"
            disabled={isLoading}
          />
          {input.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={() => setInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={clsx(
            'p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200',
            isListening 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse' 
              : 'bg-gray-800/80 text-gray-300 hover:text-white border border-gray-700/50 hover:bg-gray-700/50'
          )}
          disabled={isLoading}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
        
        <button
          type="submit"
          className={clsx(
            'p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200',
            (!input.trim() || isLoading)
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-600/50 hover:from-blue-500 hover:to-indigo-500 shadow-md'
          )}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
      
      {isListening && (
        <div className="mt-2 text-xs text-center text-gray-400">
          Listening... Speak clearly into your microphone
        </div>
      )}
    </div>
  );
}