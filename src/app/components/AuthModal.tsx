'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);

  if (!isOpen) return null;

  return (
    <>
      {mode === 'login' ? (
        <LoginForm
          onClose={onClose}
          onSwitchToRegister={() => setMode('register')}
        />
      ) : (
        <RegisterForm
          onClose={onClose}
          onSwitchToLogin={() => setMode('login')}
        />
      )}
    </>
  );
}
