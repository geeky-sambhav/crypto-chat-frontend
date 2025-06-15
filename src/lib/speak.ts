// src/lib/speak.ts
export function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }
  
    // Cancel any ongoing speech to prevent overlap
    window.speechSynthesis.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }