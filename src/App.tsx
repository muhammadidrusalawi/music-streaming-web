import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from '@/pages/auth/Login.tsx';
import HomePage from '@/pages/home/Index.tsx';
import { AppLayout } from '@/layouts/AppLayout.tsx';
import PlaylistsPage from '@/pages/playlist/Index.tsx';
import NotFoundPage from '@/pages/NotFound.tsx';
import DiscoverPage from '@/pages/discover/Index.tsx';
import PodcastsPage from '@/pages/podcast/Index.tsx';
import SearchPage from '@/pages/discover/Search.tsx';
import ProtectedRoute from '@/middleware/protected-route.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/auth/sign-in" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/home/"
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />

          <Route
            path="/home/discover"
            element={
              <AppLayout>
                <DiscoverPage />
              </AppLayout>
            }
          />

          <Route
            path="/home/discover/search/:query"
            element={
              <AppLayout>
                <SearchPage />
              </AppLayout>
            }
          />

          <Route
            path="/home/podcasts"
            element={
              <AppLayout>
                <PodcastsPage />
              </AppLayout>
            }
          />

          <Route
            path="/playlist"
            element={
              <AppLayout>
                <PlaylistsPage />
              </AppLayout>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
