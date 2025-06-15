export type Message = {
    id: string;
    author: 'user' | 'bot';
    // The content can be a simple string or a more complex React component (for charts)
    content: React.ReactNode; 
  };