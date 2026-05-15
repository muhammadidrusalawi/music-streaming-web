import {
  Heart,
  ListMusic,
  Loader2,
  PanelLeftClose,
  PanelRightClose,
} from 'lucide-react';
import { useAppLayout } from '@/hooks/use-layout.ts';
import { NavLink } from 'react-router-dom';
import { menus } from '@/constants/menulinks.ts';
import { Button } from '@/components/ui/button.tsx';
import { CreatePlaylistForm } from '@/components/playlist-form.tsx';
import { PlaylistQuery } from '@/queries/playlist.query.ts';
import { PlaylistNavLink } from '@/components/playlist-navlink.tsx';

export function Menubar() {
  const { setIsMenuBarExpand, isMenuBarExpand } = useAppLayout();
  const {
    data: playlists = [],
    isLoading,
    isError,
    error,
  } = PlaylistQuery.useList();

  return (
    <div
      className={`bg-sidebar hidden h-full flex-col gap-2 overflow-hidden rounded-md transition-all duration-500 ease-in-out md:flex ${
        isMenuBarExpand ? 'w-64' : 'w-18'
      }`}
    >
      {isMenuBarExpand ? (
        <>
          <div className="flex w-full items-center justify-between px-2 pt-2">
            <h2 className="pl-2 text-sm font-medium transition-opacity duration-500">
              Menu
            </h2>
            <Button
              onClick={() => setIsMenuBarExpand(!isMenuBarExpand)}
              variant="ghost"
            >
              <PanelLeftClose size={18} />
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            {menus.map((menu) => {
              const Icon = menu.icon;
              return (
                <NavLink key={menu.path} to={menu.path} end>
                  {({ isActive }) => (
                    <div
                      className={`flex w-full items-center transition-all duration-400 ${
                        isActive
                          ? 'from-secondary bg-linear-to-r to-transparent'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-4 px-4 py-2">
                        <Icon size={18} />
                        <span className="text-sm transition-all duration-500">
                          {menu.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="ml-auto w-1 self-stretch rounded bg-emerald-600" />
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-hidden py-2 pl-2">
            <div className="flex w-full items-center justify-between pr-2">
              <h2 className="pl-2 text-sm font-medium transition-opacity duration-500">
                Playlists
              </h2>
              <CreatePlaylistForm />
            </div>

            <div className="[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:cursor-pointer [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              <div className="flex flex-col gap-1">
                <div className="hover:bg-muted flex w-full items-center gap-4 rounded-md p-2 transition-all duration-300">
                  <Heart size={18} />
                  <span className="text-sm transition-opacity duration-300">
                    Liked Songs
                  </span>
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
                  </div>
                )}
                {isError && (
                  <div className="p-2 text-sm text-red-500">
                    Error: {error?.message || 'Failed to load playlists'}
                  </div>
                )}
                {!isLoading &&
                  !isError &&
                  playlists.map((playlist) => (
                    <PlaylistNavLink key={playlist.id} playlist={playlist} />
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <Button
            onClick={() => setIsMenuBarExpand(!isMenuBarExpand)}
            variant="ghost"
          >
            <PanelRightClose size={18} />
          </Button>

          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <NavLink key={menu.path} to={menu.path} end>
                {({ isActive }) => (
                  <Button variant="ghost">
                    <Icon
                      size={20}
                      className={`transition-colors duration-300 ${
                        isActive && 'text-emerald-600'
                      }`}
                    />
                  </Button>
                )}
              </NavLink>
            );
          })}

          <Button variant="ghost">
            <Heart size={18} />
          </Button>

          <Button variant="ghost">
            <ListMusic size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}
