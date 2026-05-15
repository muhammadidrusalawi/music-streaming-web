import { useContext } from 'react';
import { AppLayoutContext } from '@/context/layout-context.ts';

export function useAppLayout() {
  const context = useContext(AppLayoutContext);

  if (!context) {
    throw new Error('useAppLayout must be used within AppLayoutProvider');
  }

  return context;
}
