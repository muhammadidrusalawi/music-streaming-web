import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Song } from '@/types/song.ts';

type RepeatMode = 'off' | 'all' | 'one';

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  originalQueue: Song[];
  currentIndex: number | null;
  isPlaying: boolean;
  playedSeconds: number;
  duration: number;
  shuffle: boolean;
  repeat: RepeatMode;
}

const initialState: PlayerState = {
  currentSong: null,
  queue: [],
  originalQueue: [],
  currentIndex: null,
  isPlaying: false,
  playedSeconds: 0,
  duration: 0,
  shuffle: false,
  repeat: 'off',
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      const song = action.payload;
      const index = state.queue.findIndex((s) => s.id === song.id);
      if (index !== -1) {
        state.currentIndex = index;
        state.currentSong = song;
        state.playedSeconds = 0;
      } else {
        state.originalQueue = [song];
        state.queue = state.shuffle ? [song] : [song];
        state.currentIndex = 0;
        state.currentSong = song;
        state.playedSeconds = 0;
      }
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlayedSeconds: (state, action: PayloadAction<number>) => {
      state.playedSeconds = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    playNext: (state) => {
      if (state.queue.length === 0) return;

      if (state.currentIndex === null) {
        state.currentIndex = 0;
        state.currentSong = state.queue[0];
        state.playedSeconds = 0;
        state.isPlaying = true;
        return;
      }

      if (state.repeat === 'one') {
        state.playedSeconds = 0;
        state.isPlaying = true;
        return;
      }

      const nextIndex = state.currentIndex + 1;
      if (nextIndex < state.queue.length) {
        state.currentIndex = nextIndex;
        state.currentSong = state.queue[nextIndex];
        state.playedSeconds = 0;
        state.isPlaying = true;
      } else {
        if (state.repeat === 'all') {
          state.currentIndex = 0;
          state.currentSong = state.queue[0];
          state.playedSeconds = 0;
          state.isPlaying = true;
        } else {
          state.isPlaying = false;
        }
      }
    },
    playPrev: (state) => {
      if (state.queue.length === 0) return;

      if (state.currentIndex === null) {
        state.currentIndex = 0;
        state.currentSong = state.queue[0];
        state.playedSeconds = 0;
        state.isPlaying = true;
        return;
      }

      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentIndex = prevIndex;
        state.currentSong = state.queue[prevIndex];
        state.playedSeconds = 0;
        state.isPlaying = true;
      } else {
        if (state.repeat === 'all') {
          state.currentIndex = state.queue.length - 1;
          state.currentSong = state.queue[state.queue.length - 1];
          state.playedSeconds = 0;
          state.isPlaying = true;
        } else {
          state.playedSeconds = 0;
          state.isPlaying = true;
        }
      }
    },
    playSingle: (state, action: PayloadAction<Song>) => {
      const song = action.payload;
      state.originalQueue = [song];
      state.queue = [song];
      state.currentIndex = 0;
      state.currentSong = song;
      state.playedSeconds = 0;
      state.isPlaying = true;
    },
    playFromPlaylist: (
      state,
      action: PayloadAction<{ song: Song; playlist: Song[] }>,
    ) => {
      const { song, playlist } = action.payload;
      state.originalQueue = playlist;

      if (state.shuffle) {
        const shuffled = shuffleArray(playlist);
        state.queue = shuffled;
        const index = shuffled.findIndex((s) => s.id === song.id);
        state.currentIndex = index !== -1 ? index : 0;
        state.currentSong = shuffled[state.currentIndex];
      } else {
        state.queue = playlist;
        const index = playlist.findIndex((s) => s.id === song.id);
        state.currentIndex = index;
        state.currentSong = song;
      }

      state.playedSeconds = 0;
      state.isPlaying = true;
    },
    updateQueue: (state, action: PayloadAction<Song[]>) => {
      const newQueue = action.payload;
      state.originalQueue = newQueue;

      if (state.shuffle) {
        const shuffled = shuffleArray(newQueue);
        state.queue = shuffled;
        if (state.currentSong) {
          const newIndex = shuffled.findIndex(
            (s) => s.id === state.currentSong!.id,
          );
          state.currentIndex = newIndex !== -1 ? newIndex : null;
        } else {
          state.currentIndex = null;
        }
      } else {
        state.queue = newQueue;
        if (state.currentSong) {
          const newIndex = newQueue.findIndex(
            (s) => s.id === state.currentSong!.id,
          );
          state.currentIndex = newIndex !== -1 ? newIndex : null;
        } else {
          state.currentIndex = null;
        }
      }
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;

      if (state.shuffle) {
        if (state.originalQueue.length === 0) {
          state.originalQueue = [...state.queue];
        }
        const shuffled = shuffleArray(state.originalQueue);
        state.queue = shuffled;
        if (state.currentSong) {
          const newIndex = shuffled.findIndex(
            (s) => s.id === state.currentSong!.id,
          );
          state.currentIndex = newIndex !== -1 ? newIndex : 0;
        } else {
          state.currentIndex = null;
        }
      } else {
        state.queue = [...state.originalQueue];
        if (state.currentSong) {
          const newIndex = state.originalQueue.findIndex(
            (s) => s.id === state.currentSong!.id,
          );
          state.currentIndex = newIndex !== -1 ? newIndex : null;
        } else {
          state.currentIndex = null;
        }
      }
    },
    setRepeat: (state, action: PayloadAction<RepeatMode>) => {
      state.repeat = action.payload;
    },
    toggleRepeat: (state) => {
      const modes: RepeatMode[] = ['off', 'all', 'one'];
      const currentIndex = modes.indexOf(state.repeat);
      const nextIndex = (currentIndex + 1) % modes.length;
      state.repeat = modes[nextIndex];
    },
  },
});

export const {
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
} = playerSlice.actions;

export default playerSlice.reducer;
