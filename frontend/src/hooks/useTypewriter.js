import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 50, backspaceSpeed = 30, delayBeforeBackspace = 3000) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      // Typing phase
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        // Finished typing, wait before backspacing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBeforeBackspace);
      }
    } else {
      // Backspacing phase
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, backspaceSpeed);
      } else {
        // Finished backspacing, start typing again
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, text, speed, backspaceSpeed, delayBeforeBackspace]);

  return displayedText;
};
