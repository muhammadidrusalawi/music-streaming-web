import {
  Dot,
  ListMusic,
  Loader2,
  MoreHorizontalIcon,
  Play,
  Shuffle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { PlaylistQuery } from '@/queries/playlist.query.ts';
import { useDispatch } from 'react-redux';

import {
  playFromPlaylist,
  playSingle,
  toggleShuffle,
} from '@/store/playerSlice.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import type { Song } from '@/types/song.ts';
import { useAppLayout } from '@/hooks/use-layout.ts';

export default function PlaylistsPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('list') ?? undefined;
  const { user } = useAppLayout();

  const {
    data: playlist,
    isLoading,
    isError,
    error,
  } = PlaylistQuery.useGetById(id);

  const dispatch = useDispatch();
  const songs = playlist?.songs ?? [];

  const handlePlayAll = () => {
    if (songs.length === 0) return;
    dispatch(playFromPlaylist({ song: songs[0], playlist: songs }));
  };

  const handleShuffle = () => {
    if (songs.length === 0) return;
    handlePlayAll();
    dispatch(toggleShuffle());
  };

  const handlePlay = (track: Song) => {
    dispatch(playSingle(track));
  };

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-600">Error: {(error as Error).message}</p>
      </div>
    );

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <div className="blur-in-3xl absolute inset-0 -z-10 bg-linear-to-b from-emerald-900 via-emerald-800 to-emerald-950" />

        <div className="flex items-center gap-4 px-8 py-4">
          <div className="flex h-36 w-36 items-center justify-center rounded-md bg-emerald-600 p-4">
            <ListMusic size={30} />
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <h1 className="text-sm font-medium">Playlists</h1>
            <h2 className="font-sans text-5xl font-extrabold">
              {playlist?.name}
            </h2>
            <div className="flex items-center text-sm">
              <span>By {user?.username}</span> <Dot size={30} />
              <span className="text-muted-foreground">
                {songs.length} songs
              </span>
            </div>
          </div>
        </div>

        <div className="bg-sidebar/50 mt-4 flex items-center px-8 py-4">
          <Button
            variant="secondary"
            onClick={handlePlayAll}
            disabled={songs.length === 0}
            className="mx-1 size-14 rounded-full bg-emerald-600 hover:bg-emerald-700"
          >
            <Play fill="currentColor" />
          </Button>
          <Button
            variant="ghost"
            onClick={handleShuffle}
            disabled={songs.length === 0}
          >
            <Shuffle />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-2">
        <div className="text-muted-foreground grid grid-cols-[48px_1fr_auto_40px] items-center gap-4 p-4 text-xs font-medium tracking-wider capitalize">
          <div className="px-5">#</div>
          <div>Title</div>
          <div className="pr-6">Date Added</div>
          <div></div>
        </div>

        <div className="bg-border my-1 h-[1px]" />

        {playlist?.songs?.map((song, idx) => (
          <div
            key={song.id}
            onClick={() => handlePlay(song)}
            className="group hover:bg-muted grid cursor-pointer grid-cols-[48px_1fr_auto_40px] items-center gap-4 rounded-md px-4 py-3 transition-colors duration-300"
          >
            <div className="text-muted-foreground flex items-center justify-center px-2 text-sm">
              <span className="group-hover:hidden">{idx + 1}</span>
              <Play
                fill="currentColor"
                className="hidden h-4 w-4 cursor-pointer group-hover:block"
              />
            </div>

            <div>
              <div className="line-clamp-1 text-sm font-medium">
                {song.title}
              </div>
              <div className="text-muted-foreground line-clamp-1 text-sm">
                {song.artist}
              </div>
            </div>

            <div className="text-muted-foreground px-4 text-sm whitespace-nowrap">
              {song.added_at
                ? new Date(song.added_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : '—'}
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
