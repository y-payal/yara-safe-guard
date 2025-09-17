import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return isLogin ? (
    <LoginForm onToggleMode={toggleMode} />
  ) : (
    <SignupForm onToggleMode={toggleMode} />
  );
};

export default Auth;