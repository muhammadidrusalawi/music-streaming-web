import { Link } from 'react-router-dom';
import { Compass, Home, Library, Settings } from 'lucide-react';

export function MobileNav() {
  return (
    <nav className="bg-background flex w-full items-center justify-between gap-4 px-6 py-4 md:hidden">
      <Link to="/home" className="flex flex-col items-center gap-1">
        <Home size={20} />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/home/discover" className="flex flex-col items-center gap-1">
        <Compass size={20} />
        <span className="text-xs">Explore</span>
      </Link>
      <Link to="/home/playlists" className="flex flex-col items-center gap-1">
        <Library size={20} />
        <span className="text-xs">Library</span>
      </Link>
      <Link to="#" className="flex flex-col items-center gap-1">
        <Settings size={20} />
        <span className="text-xs">Settings</span>
      </Link>
    </nav>
  );
}
