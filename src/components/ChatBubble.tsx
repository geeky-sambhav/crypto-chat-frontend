// src/components/ChatBubble.tsx
import { Message } from '@/lib/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type Props = {
  message: Message;
};

export default function ChatBubble({ message }: Props) {
  const isUser = message.author === 'user';
  
  return (
    <motion.div 
      className={clsx('flex', isUser ? 'justify-end' : 'justify-start')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-xs font-bold">AI</span>
        </div>
      )}
      <div
        className={clsx(
          'max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md',
          isUser 
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none' 
            : 'bg-gray-800/80 text-white border border-gray-700/50 rounded-tl-none backdrop-blur-sm'
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ml-2 flex-shrink-0">
          <span className="text-xs font-bold">You</span>
        </div>
      )}
    </motion.div>
  );
}