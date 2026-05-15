import { useParams } from 'react-router-dom';
import type { Song } from '@/types/song.ts';
import { playFromPlaylist, playSingle } from '@/store/playerSlice.ts';
import { useDispatch } from 'react-redux';
import { Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { SongQuery } from '@/queries/song.query.ts';

export default function SearchPage() {
  const { query } = useParams<{ query: string }>();
  const {
    data: songs = [],
    isLoading,
    isError,
    error,
  } = SongQuery.useSearch(query);

  const dispatch = useDispatch();

  const handlePlay = (track: Song) => {
    dispatch(playSingle(track));
  };

  const handlePlayAll = () => {
    if (songs.length > 0) {
      dispatch(playFromPlaylist({ song: songs[0], playlist: songs }));
    }
  };

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <Loader2 size={30} className="animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <p>Error: {(error as Error).message}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between gap-4 px-2">
        <h2 className="text-sm">Search Results for "{query}"</h2>
        <Button onClick={() => handlePlayAll()} variant="secondary">
          Play All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <div
            key={song.id}
            onClick={() => handlePlay(song)}
            className="group hover:bg-muted flex cursor-pointer flex-col items-center gap-4 rounded-md p-2 transition-colors duration-300"
          >
            <div className="relative w-full">
              <img
                src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`}
                alt={song.title}
                className="h-full w-full rounded-md"
              />

              <div className="bg-background/70 absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <div className="text-primary flex h-full w-full items-center justify-center">
                  <Play size={30} fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col space-y-1">
              <p className="text-accent-foreground line-clamp-2 text-sm">
                {song.title}
              </p>
              <p className="text-muted-foreground text-xs">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {songs.length > 0 && (
        <Button variant="secondary" className="mx-auto w-fit">
          Load More
        </Button>
      )}
    </div>
  );
}
