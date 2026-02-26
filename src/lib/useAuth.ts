'use client';

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type UserRole = 'editor' | 'reader';

interface User {
  email: string;
  name: string;
  role: UserRole;
}

const VALID_USERS = [
  { email: 'gustavo.geraldo@morada.com.br', password: 'Morad@2026', name: 'Gustavo Geraldo', role: 'editor' as UserRole },
  { email: 'bianca.tavares@morada.com.br', password: 'Morad@2026', name: 'Bianca Tavares', role: 'reader' as UserRole },
];

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('auth-user', null);
  const [error, setError] = useState('');

  const login = (email: string, password: string): boolean => {
    const found = VALID_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setUser({ email: found.email, name: found.name, role: found.role });
      setError('');
      return true;
    }
    setError('E-mail ou senha inválidos.');
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isEditor = user?.role === 'editor';

  return { user, error, login, logout, isAuthenticated: !!user, isEditor };
}
