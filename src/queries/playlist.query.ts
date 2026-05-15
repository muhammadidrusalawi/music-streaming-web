import type { Playlist } from '@/types/playlist.ts';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import {
  addSongToPlaylistApi,
  createPlaylistApi,
  getAllPlaylistsApi,
  getPlaylistByIdApi,
} from '@/api/playlist.ts';
import type {
  AddSongToPlaylistForm,
  CreatePlaylistForm,
} from '@/request/playlist.ts';
import toast from 'react-hot-toast';

export const PlaylistQuery = {
  useList() {
    const options: UseQueryOptions<Playlist[], Error> = {
      queryKey: ['playlists'],
      queryFn: async () => {
        const res = await getAllPlaylistsApi();
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

  useGetById(id?: string) {
    return useQuery({
      queryKey: ['playlists', id],
      queryFn: async (): Promise<Playlist> => {
        const res = await getPlaylistByIdApi(id!);
        return res.data;
      },
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });
  },

  useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: CreatePlaylistForm) => createPlaylistApi(payload),
      onSuccess: async (res) => {
        toast.success(res.message);
        await queryClient.invalidateQueries({ queryKey: ['playlists'] });
      },
      onError: (err: any) => {
        if (err.name === 'ZodError') {
          toast.error('Invalid playlists data');
        } else {
          toast.error(err?.response?.data?.message || 'An error occurred');
        }
      },
    });
  },

  useAddSong() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        playlistId,
        songData,
      }: {
        playlistId: string;
        songData: AddSongToPlaylistForm;
      }) => addSongToPlaylistApi(playlistId, songData),
      onSuccess: async (res, variables) => {
        toast.success(res.message);
        await queryClient.invalidateQueries({ queryKey: ['playlists'] });
        await queryClient.invalidateQueries({
          queryKey: ['playlists', variables.playlistId],
        });
      },
      onError: (err: any) => {
        if (err.name === 'ZodError') {
          toast.error('Invalid playlist data');
        } else {
          toast.error(err?.response?.data?.message || 'An error occurred');
        }
      },
    });
  },
};
