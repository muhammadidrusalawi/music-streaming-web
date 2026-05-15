import { AppLayoutContext } from '@/context/layout-context';
import { useEffect, useState } from 'react';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import type { User } from '@/types/user.ts';

export const AppLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const userStr = getCookie('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return getCookie('token') || null;
    } catch {
      return null;
    }
  });

  const login = (user: User, authToken: string) => {
    setToken(authToken);
    setCookie('token', authToken);
    setUser(user);
    setCookie('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    removeCookie('token');
    setUser(null);
    removeCookie('user');
  };

  const [isMenuBarExpand, setIsMenuBarExpand] = useState<boolean>(() => {
    const stored = localStorage.getItem('menubar-expand');
    return stored === null ? true : stored === 'true';
  });

  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem('player-open');
    return stored === null ? false : stored === 'true';
  });

  const [isPlayerExpand, setIsPlayerExpand] = useState<boolean>(() => {
    const stored = localStorage.getItem('player-expand');
    return stored === null ? false : stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('menubar-expand', String(isMenuBarExpand));
  }, [isMenuBarExpand]);

  useEffect(() => {
    localStorage.setItem('player-open', String(isPlayerOpen));
    localStorage.setItem('player-expand', String(isPlayerExpand));
  }, [isPlayerOpen, isPlayerExpand]);

  return (
    <AppLayoutContext.Provider
      value={{
        user,
        login,
        logout,
        token,
        initialized: true,
        isAuthenticated: !!token,
        isMenuBarExpand,
        setIsMenuBarExpand,
        isPlayerOpen,
        setIsPlayerOpen,
        isPlayerExpand,
        setIsPlayerExpand,
      }}
    >
      {children}
    </AppLayoutContext.Provider>
  );
};
