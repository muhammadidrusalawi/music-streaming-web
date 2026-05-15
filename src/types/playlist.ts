import type { Song } from '@/types/song.ts';

export interface Playlist {
  id: string;
  name: string;
  songs?: Song[] | null;
  created_at: string;
  updated_at: string;
}

export type PlaylistsResponse = Playlist[];
