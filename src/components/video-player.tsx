import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/store/index.ts';
import { setPlayedSeconds, setDuration, playNext } from '@/store/playerSlice';
import { Music4 } from 'lucide-react';
import { ScaleLoader } from 'react-spinners';

declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLElement | string,
        options: YTPlayerOptions,
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface YTPlayer {
  destroy(): void;
  loadVideoById(videoId: string): void;
  playVideo(): void;
  pauseVideo(): void;
  getCurrentTime(): number;
  getDuration(): number;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
}

interface YTPlayerOptions {
  videoId: string;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number }) => void;
    onError?: (event: { data: number }) => void;
  };
  playerVars?: Record<string, unknown>;
}

export default function VideoPlayer() {
  const dispatch = useDispatch();
  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong,
  );
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const repeat = useSelector((state: RootState) => state.player.repeat);

  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerReadyRef = useRef(false);
  const loadingTimerRef = useRef<number | null>(null);
  const hasEndedRef = useRef(false);

  const isPlayingRef = useRef(isPlaying);
  const repeatRef = useRef(repeat);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const clearLoadingTimer = () => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!currentSong) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong) {
      return;
    }

    const loadOrCreatePlayer = () => {
      if (playerReadyRef.current && playerRef.current) {
        setIsLoading(true);
        clearLoadingTimer();
        loadingTimerRef.current = window.setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        playerRef.current.loadVideoById(currentSong.youtubeId);
        if (isPlayingRef.current) {
          playerRef.current.playVideo();
        }
      } else {
        setIsLoading(true);
        clearLoadingTimer();
        if (!iframeRef.current) return;

        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
        }

        playerRef.current = new window.YT.Player(iframeRef.current, {
          videoId: currentSong.youtubeId,
          events: {
            onReady: (event) => {
              playerReadyRef.current = true;
              dispatch(setDuration(event.target.getDuration()));
              if (isPlayingRef.current) {
                event.target.playVideo();
              }
              setIsLoading(false);
              clearLoadingTimer();
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsLoading(false);
                clearLoadingTimer();
                hasEndedRef.current = false;
              } else if (event.data === window.YT.PlayerState.ENDED) {
                hasEndedRef.current = true;
                dispatch(playNext());

                if (repeatRef.current === 'one') {
                  playerRef.current?.seekTo(0);
                  playerRef.current?.playVideo();
                }
              }
            },
            onError: () => {
              setIsLoading(false);
              clearLoadingTimer();
            },
          },
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
          },
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onload = () => {
        window.onYouTubeIframeAPIReady = loadOrCreatePlayer;
      };
      document.body.appendChild(tag);
    } else if (window.YT.Player) {
      loadOrCreatePlayer();
    }

    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        dispatch(setPlayedSeconds(playerRef.current.getCurrentTime()));
        dispatch(setDuration(playerRef.current.getDuration()));
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearLoadingTimer();
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (playerRef.current && playerReadyRef.current) {
      if (isPlaying) {
        if (hasEndedRef.current) {
          playerRef.current.seekTo(0);
          hasEndedRef.current = false;
        }
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      clearLoadingTimer();
    };
  }, []);

  if (!currentSong) {
    return (
      <div className="bg-muted flex h-full w-full flex-col items-center justify-center gap-4 rounded-md p-6">
        <Music4 size={48} />
        <div className="flex flex-col gap-1.5 text-center">
          <p className="text-sm font-medium">No track playing</p>
          <p className="text-muted-foreground text-xs">
            Select a song from the list to start listening
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={iframeRef} className="h-full w-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <ScaleLoader height={15} width={2} color="var(--color-primary)" />
        </div>
      )}
    </div>
  );
}
