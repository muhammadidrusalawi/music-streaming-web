import { Button } from '@/components/ui/button.tsx';
import { Play } from 'lucide-react';

const dummyPlaylist = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
}));

function randomGradient(i: number) {
  const colors = [
    ['#f43f5e', '#3b82f6'],
    ['#f97316', '#22c55e'],
    ['#a855f7', '#facc15'],
    ['#06b6d4', '#f43f5e'],
    ['#8b5cf6', '#ec4899'],
    ['#f87171', '#34d399'],
  ];
  return `linear-gradient(to bottom right, ${colors[i % colors.length][0]}, ${colors[i % colors.length][1]})`;
}

export default function DiscoverPage() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {dummyPlaylist.map((song, i) => (
        <div
          key={song.id}
          className="relative flex flex-col gap-2 rounded-md p-2 transition-transform duration-300 hover:scale-105"
        >
          <div
            style={{ background: randomGradient(i) }}
            className="flex h-40 w-full items-end justify-start rounded-md p-2"
          >
            <Button className="rounded-full bg-white p-2 text-black">
              <Play fill="currentColor" size={16} />
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <p className="truncate text-sm font-semibold text-white">
              {song.title}
            </p>
            <p className="truncate text-xs text-gray-300">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
