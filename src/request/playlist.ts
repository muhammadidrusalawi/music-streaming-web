import { z } from 'zod';

export const createPlaylistRequest = z.object({
  name: z
    .string()
    .min(6, { error: 'Playlist name must be at least 6 characters long' }),
});

export const addSongToPlaylistRequest = z.object({
  youtube_id: z.string(),
  title: z.string(),
  artist: z.string(),
});

export type CreatePlaylistForm = z.infer<typeof createPlaylistRequest>;
export type AddSongToPlaylistForm = z.infer<typeof addSongToPlaylistRequest>;
