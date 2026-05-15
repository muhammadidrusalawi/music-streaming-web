import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ListPlus, Loader2, Plus } from 'lucide-react';
import { PlaylistQuery } from '@/queries/playlist.query';
import { usePlayer } from '@/hooks/use-player';

export function AddSong() {
  const { currentSong } = usePlayer();
  const {
    data: playlists = [],
    isLoading,
    isError,
    error,
  } = PlaylistQuery.useList();

  const { mutate: addSong, isPending } = PlaylistQuery.useAddSong();

  const handleAddToPlaylist = (playlistId: string) => {
    if (!currentSong) return;
    addSong({
      playlistId,
      songData: {
        youtube_id: currentSong.youtubeId,
        title: currentSong.title,
        artist: currentSong.artist,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" disabled={!currentSong}>
          <ListPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Song To Playlist</DialogTitle>
          <DialogDescription>
            {currentSong
              ? `Add "${currentSong.title}" to a playlist`
              : 'No song is currently playing'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {isLoading && (
            <p className="text-muted-foreground text-sm">
              Loading playlists...
            </p>
          )}
          {isError && (
            <p className="text-destructive text-sm">Error: {error?.message}</p>
          )}
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center justify-between rounded-md border py-1 pr-2 pl-4"
            >
              <span className="text-sm font-medium">{playlist.name}</span>
              <Button
                size="sm"
                onClick={() => handleAddToPlaylist(playlist.id)}
                disabled={isPending}
                variant="ghost"
              >
                {isPending ? <Loader2 className="animate-spin" /> : <Plus />}
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
