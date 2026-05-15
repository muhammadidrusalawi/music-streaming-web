import { SongQuery } from '@/queries/song.query.ts';
import { Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useDispatch } from 'react-redux';
import type { Song } from '@/types/song.ts';
import { playSingle } from '@/store/playerSlice.ts';

export default function PodcastsPage() {
  const {
    data: podcasts = [],
    isLoading,
    isError,
    error,
  } = SongQuery.usePodcasts();

  const dispatch = useDispatch();

  const handlePlay = (track: Song) => {
    dispatch(playSingle(track));
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
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {podcasts.map((item) => (
          <div
            key={item.id}
            onClick={() => handlePlay(item)}
            className="group hover:bg-muted flex cursor-pointer flex-col items-center gap-4 rounded-md p-2 transition-colors duration-300"
          >
            <div className="relative w-full">
              <img
                src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                alt={item.title}
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
                {item.title}
              </p>
              <p className="text-muted-foreground text-xs">{item.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {podcasts.length > 0 && (
        <Button variant="secondary" className="mx-auto w-fit">
          Load More
        </Button>
      )}
    </div>
  );
}
