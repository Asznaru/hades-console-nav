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

    // Trigger glitch every second
    const intervalId = setInterval(() => {
      triggerGlitch();
    }, 1000); // 1 second

    return () => {
      clearInterval(intervalId);
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
