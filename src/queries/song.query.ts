import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { Song } from '@/types/song.ts';
import { getPodcastsApi, searchSongsApi } from '@/api/song.ts';

export const SongQuery = {
  useSearch(query?: string) {
    return useQuery<Song[], Error>({
      queryKey: ['songs', query],
      queryFn: async () => {
        const res = await searchSongsApi(query!);

        if (!res.success) {
          throw new Error(res.message);
        }

        return res.data ?? [];
      },
      enabled: !!query,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    });
  },

  usePodcasts() {
    const options: UseQueryOptions<Song[], Error> = {
      queryKey: ['podcasts'],
      queryFn: async () => {
        const res = await getPodcastsApi();
        return res.data ?? [];
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    };

    return useQuery(options);
  },
};
