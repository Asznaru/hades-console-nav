import React, { useState } from 'react';
import LoginInterface from './LoginInterface';
import TerminalInterface from './TerminalInterface';

const AuthenticatedApp: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ nick: string } | null>(null);

  const handleLogin = (nick: string) => {
    setUserInfo({ nick });
  };

  if (!userInfo) {
    return <LoginInterface onLogin={handleLogin} />;
  }

  return <TerminalInterface userInfo={userInfo} />;
};

export default AuthenticatedApp;