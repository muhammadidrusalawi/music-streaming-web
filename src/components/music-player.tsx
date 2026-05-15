import {
  SkipBack,
  Play,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Pause,
  Repeat1,
} from 'lucide-react';
import { usePlayer } from '@/hooks/use-player.ts';
import { Button } from '@/components/ui/button.tsx';
import { AddSong } from '@/components/add-song.tsx';

export function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playedSeconds,
    duration,
    playPrev,
    playNext,
    shuffle,
    repeat,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const formatTime = (seconds?: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getRepeatIcon = () => {
    switch (repeat) {
      case 'one':
        return <Repeat1 className="text-emerald-600" />;
      case 'all':
        return <Repeat className="text-emerald-600" />;
      default:
        return <Repeat />;
    }
  };

  return (
    <>
      <div className="bg-border pointer-events-none fixed bottom-40 left-0 z-50 flex h-0.5 w-full md:bottom-20">
        <div
          className="bg-primary h-full"
          style={{
            width: duration ? `${(playedSeconds / duration) * 100}%` : '0%',
          }}
        />
      </div>

      <div className="bg-sidebar md:bg-background flex h-20 w-full translate-y-2 items-center px-4 md:translate-y-0">
        {currentSong ? (
          <div className="flex w-full items-center space-x-4 md:w-1/3">
            <div className="bg-border h-12 w-12 overflow-hidden rounded">
              <img
                src={`https://img.youtube.com/vi/${currentSong.youtubeId}/hqdefault.jpg`}
                alt={currentSong.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex h-14 w-full max-w-xs flex-col justify-center space-y-1">
              <p className="min-w-0 truncate text-sm font-medium">
                {currentSong.title}
              </p>
              <p className="text-muted-foreground min-w-0 truncate text-xs">
                {currentSong.artist}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-1/3" />
        )}

        <div className="hidden w-1/3 items-center justify-center md:flex">
          <Button variant="ghost" onClick={toggleShuffle}>
            <Shuffle className={shuffle ? 'text-emerald-600' : ''} />
          </Button>

          <Button
            onClick={playPrev}
            variant="ghost"
            className="active:text-emerald-600"
          >
            <SkipBack />
          </Button>

          <Button
            onClick={togglePlay}
            disabled={!currentSong}
            variant="secondary"
            className="mx-1 size-12 rounded-full"
          >
            {isPlaying ? <Pause /> : <Play fill="currentColor" />}
          </Button>

          <Button
            onClick={playNext}
            variant="ghost"
            className="active:text-emerald-600"
          >
            <SkipForward />
          </Button>

          <Button variant="ghost" onClick={toggleRepeat}>
            {getRepeatIcon()}
          </Button>
        </div>

        <div className="hidden w-1/3 items-center justify-end md:flex">
          <AddSong />
          <Button variant="ghost" className="text-xs">
            {formatTime(playedSeconds)} / {formatTime(duration)}
          </Button>
          <Button variant="ghost">
            <Volume2 />
          </Button>
          <Button variant="ghost">
            <div className="bg-border h-1 w-20 rounded-full">
              <div className="bg-primary h-1 w-3/4 rounded-full" />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
