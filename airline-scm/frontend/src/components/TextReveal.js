import React, { useState, useEffect } from 'react';

const TextReveal = ({ text, className = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, delay + currentIndex * 2);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span className={className}>{displayText}</span>;
};

export default TextReveal;
