import axiosInstance from '@/utils/axios-instance.ts';
import type { ApiResponse } from '@/types/api.ts';
import type { SongsResponse } from '@/types/song.ts';

export const searchSongsApi = async (
  query: string,
): Promise<ApiResponse<SongsResponse>> => {
  const res = await axiosInstance.get<ApiResponse<SongsResponse>>(
    `/song/search?q=${query}`,
  );
  return res.data;
};

export const getPodcastsApi = async (): Promise<ApiResponse<SongsResponse>> => {
  const res = await axiosInstance.get<ApiResponse<SongsResponse>>('/podcasts');
  return res.data;
};
