export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  added_at?: string | null;
}

export type SongsResponse = Song[];
