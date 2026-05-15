import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/store/index.ts';
import { playFromPlaylist } from '@/store/playerSlice';
import { Music4, Play } from 'lucide-react';
import { ScaleLoader } from 'react-spinners';
import { type Song } from '@/types/song.ts';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';

interface PlaylistPanelProps {
  playlist: Song[];
  title?: string;
}

export function PlaylistPanel({
  playlist,
  title = 'Playlist',
}: PlaylistPanelProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong,
  );

  if (playlist.length <= 1) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
        <Music4 size={48} className="text-primary" />
        <div className="space-y-1 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Tracklist is empty
          </p>
          <p className="text-muted-foreground/70 text-xs">
            Add songs from search or your playlists
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/home/discover')}>
          Explore music
        </Button>
      </div>
    );
  }

  const handlePlay = (track: Song) => {
    dispatch(playFromPlaylist({ song: track, playlist }));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col p-2">
      <div className="mb-2 flex items-center pl-2">
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>

      <div className="[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:cursor-pointer [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        <div className="space-y-1">
          {playlist.map((track) => (
            <div
              key={track.id}
              onClick={() => handlePlay(track)}
              className={`group hover:bg-muted flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors duration-300 ease-in-out ${
                currentSong?.id === track.id ? 'bg-muted/70' : ''
              }`}
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-700">
                <img
                  src={`https://img.youtube.com/vi/${track.youtubeId}/mqdefault.jpg`}
                  alt={track.title}
                  className="h-full w-full object-cover"
                />
                {currentSong?.id !== track.id && (
                  <div className="bg-background/70 absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <div className="flex h-full w-full items-center justify-center">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                )}

                {currentSong?.id === track.id && (
                  <div className="bg-background/50 absolute inset-0 flex items-center justify-center">
                    <ScaleLoader
                      height={15}
                      width={2}
                      color="var(--color-primary)"
                    />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-accent-foreground truncate text-sm">
                  {track.title}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
