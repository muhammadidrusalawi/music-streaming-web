import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { type RootState, type AppDispatch } from '@/store/index.ts';
import {
  setCurrentSong,
  play,
  pause,
  togglePlay,
  setPlayedSeconds,
  setDuration,
  playNext,
  playPrev,
  playSingle,
  playFromPlaylist,
  updateQueue,
  toggleShuffle,
  setRepeat,
  toggleRepeat,
} from '@/store/playerSlice';
import { type Song } from '@/types/song.ts';

export const usePlayer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong,
  );
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const playedSeconds = useSelector(
    (state: RootState) => state.player.playedSeconds,
  );
  const duration = useSelector((state: RootState) => state.player.duration);
  const queue = useSelector((state: RootState) => state.player.queue);
  const currentIndex = useSelector(
    (state: RootState) => state.player.currentIndex,
  );
  const shuffle = useSelector((state: RootState) => state.player.shuffle);
  const repeat = useSelector((state: RootState) => state.player.repeat);

  const setCurrentSongHandler = useCallback(
    (song: Song) => dispatch(setCurrentSong(song)),
    [dispatch],
  );

  const playHandler = useCallback(() => dispatch(play()), [dispatch]);
  const pauseHandler = useCallback(() => dispatch(pause()), [dispatch]);
  const togglePlayHandler = useCallback(
    () => dispatch(togglePlay()),
    [dispatch],
  );

  const setPlayedSecondsHandler = useCallback(
    (seconds: number) => dispatch(setPlayedSeconds(seconds)),
    [dispatch],
  );

  const setDurationHandler = useCallback(
    (seconds: number) => dispatch(setDuration(seconds)),
    [dispatch],
  );

  const playNextHandler = useCallback(() => dispatch(playNext()), [dispatch]);
  const playPrevHandler = useCallback(() => dispatch(playPrev()), [dispatch]);

  const playSingleHandler = useCallback(
    (song: Song) => dispatch(playSingle(song)),
    [dispatch],
  );

  const playFromPlaylistHandler = useCallback(
    (song: Song, playlist: Song[]) =>
      dispatch(playFromPlaylist({ song, playlist })),
    [dispatch],
  );

  const updateQueueHandler = useCallback(
    (songs: Song[]) => dispatch(updateQueue(songs)),
    [dispatch],
  );

  const toggleShuffleHandler = useCallback(
    () => dispatch(toggleShuffle()),
    [dispatch],
  );

  const setRepeatHandler = useCallback(
    (mode: 'off' | 'all' | 'one') => dispatch(setRepeat(mode)),
    [dispatch],
  );

  const toggleRepeatHandler = useCallback(
    () => dispatch(toggleRepeat()),
    [dispatch],
  );

  return {
    currentSong,
    isPlaying,
    playedSeconds,
    duration,
    queue,
    currentIndex,
    shuffle,
    repeat,
    setCurrentSong: setCurrentSongHandler,
    play: playHandler,
    pause: pauseHandler,
    togglePlay: togglePlayHandler,
    setPlayedSeconds: setPlayedSecondsHandler,
    setDuration: setDurationHandler,
    playNext: playNextHandler,
    playPrev: playPrevHandler,
    playSingle: playSingleHandler,
    playFromPlaylist: playFromPlaylistHandler,
    updateQueue: updateQueueHandler,
    toggleShuffle: toggleShuffleHandler,
    setRepeat: setRepeatHandler,
    toggleRepeat: toggleRepeatHandler,
  };
};
