import React, { useState } from 'react';
import LoginInterface from './LoginInterface';
import TerminalInterface from './TerminalInterface';

const AuthenticatedApp: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ nick: string; address: string } | null>(null);

  const handleLogin = (nick: string, address: string) => {
    setUserInfo({ nick, address });
  };

  if (!userInfo) {
    return <LoginInterface onLogin={handleLogin} />;
  }

  return <TerminalInterface userInfo={userInfo} />;
};

export default AuthenticatedApp;