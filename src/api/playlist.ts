import axiosInstance from '@/utils/axios-instance.ts';
import {
  type AddSongToPlaylistForm,
  type CreatePlaylistForm,
  createPlaylistRequest,
} from '@/request/playlist.ts';
import type { ApiResponse } from '@/types/api.ts';
import type { Playlist, PlaylistsResponse } from '@/types/playlist.ts';

export const getAllPlaylistsApi = async (): Promise<
  ApiResponse<PlaylistsResponse>
> => {
  const res =
    await axiosInstance.get<ApiResponse<PlaylistsResponse>>('/playlists');
  return res.data;
};

export const getPlaylistByIdApi = async (
  id: string,
): Promise<ApiResponse<Playlist>> => {
  const res = await axiosInstance.get<ApiResponse<Playlist>>(
    `/playlists/${id}`,
  );
  return res.data;
};

export const createPlaylistApi = async (
  payload: CreatePlaylistForm,
): Promise<ApiResponse<PlaylistsResponse>> => {
  const parsed = createPlaylistRequest.parse(payload);
  const res = await axiosInstance.post<ApiResponse<PlaylistsResponse>>(
    '/playlists',
    parsed,
  );
  return res.data;
};

export const addSongToPlaylistApi = async (
  id: string,
  payload: AddSongToPlaylistForm,
): Promise<ApiResponse<void>> => {
  const res = await axiosInstance.post<ApiResponse<void>>(
    `/playlists/${id}/songs`,
    payload,
  );
  return res.data;
};
