import { Button } from '@/components/ui/button.tsx';
import { Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="to-background flex items-center rounded-md bg-linear-to-bl from-pink-500 via-blue-500 p-10">
        <div className="flex flex-col gap-6">
          <h2>Playlist</h2>
          <p className="w-56 text-5xl font-bold">Top Song Of The Week</p>

          <div className="flex gap-2">
            <Button className="rounded-full px-5.5">
              <Play fill="currentColor" />
              Play
            </Button>
            <Button variant="secondary" className="rounded-full px-5.5">
              View Playlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
