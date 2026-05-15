import { NavLink, useLocation } from 'react-router-dom';
import { ListMusic } from 'lucide-react';
import type { Playlist } from '@/types/playlist';

export function PlaylistNavLink({ playlist }: { playlist: Playlist }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isActive = searchParams.get('list') === playlist.id;

  return (
    <NavLink
      to={`/playlist?list=${playlist.id}`}
      className={() =>
        `flex w-full items-center gap-4 rounded-md p-2 transition-all duration-300 ${
          isActive ? 'bg-muted' : 'hover:bg-muted'
        }`
      }
    >
      <ListMusic size={18} />
      <span className="text-sm">{playlist.name}</span>
    </NavLink>
  );
}
