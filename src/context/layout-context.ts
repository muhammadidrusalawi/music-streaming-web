import { createContext } from 'react';
import type { User } from '@/types/user.ts';

interface AppLayoutContextType {
  user: User | null;

  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;

  isAuthenticated: boolean;
  initialized: boolean;

  isMenuBarExpand: boolean;
  setIsMenuBarExpand: (expand: boolean) => void;

  isPlayerOpen: boolean;
  setIsPlayerOpen: (open: boolean) => void;

  isPlayerExpand: boolean;
  setIsPlayerExpand: (expand: boolean) => void;
}

export const AppLayoutContext = createContext<AppLayoutContextType | undefined>(
  undefined,
);
