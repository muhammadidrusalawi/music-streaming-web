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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus } from 'lucide-react';
import { PlaylistQuery } from '@/queries/playlist.query.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type CreatePlaylistForm,
  createPlaylistRequest,
} from '@/request/playlist.ts';

export function CreatePlaylistForm() {
  const createPlaylist = PlaylistQuery.useCreate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePlaylistForm>({
    resolver: zodResolver(createPlaylistRequest),
  });

  const onSubmit = async (data: CreatePlaylistForm) => {
    await createPlaylist.mutateAsync(data);

    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new playlist</DialogTitle>
            <DialogDescription>
              Add a new playlist to your library.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                {...register('name')}
                placeholder="Enter playlist name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
