import React, { useEffect, useState } from 'react';

const GlitchEffect: React.FC = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      
      // Duration of glitch effect
      setTimeout(() => {
        setIsGlitching(false);
      }, 300);
    };

    // Random interval between 5-15 seconds
    const getRandomInterval = () => {
      return Math.random() * 10000 + 5000; // 5-15 seconds
    };

    const scheduleNextGlitch = () => {
      const interval = getRandomInterval();
      return setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch();
      }, interval);
    };

    const timeoutId = scheduleNextGlitch();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (isGlitching) {
      document.body.classList.add('glitch-active');
    } else {
      document.body.classList.remove('glitch-active');
    }
  }, [isGlitching]);

  return null;
};

export default GlitchEffect;
