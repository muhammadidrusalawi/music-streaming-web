import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@/provider/theme-provider.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppLayoutProvider } from '@/provider/layout-provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <AppLayoutProvider>
            <Toaster
              position="top-right"
              reverseOrder={true}
              toastOptions={{
                style: {
                  background: 'var(--card)',
                  color: 'var(--card-foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />
            <App />
          </AppLayoutProvider>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
