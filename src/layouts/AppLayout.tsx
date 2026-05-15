import { MusicPlayer } from '@/components/music-player.tsx';
import { useAppLayout } from '@/hooks/use-layout.ts';
import { Header } from '@/components/header.tsx';
import { Menubar } from '@/components/menubar.tsx';
import { Playerbar } from '@/components/playerbar.tsx';
import { MobileNav } from '@/components/mobile-nav.tsx';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isPlayerExpand } = useAppLayout();

  return (
    <div className="flex h-screen flex-col gap-4 overflow-hidden">
      <Header />
      <div
        className={`flex flex-1 overflow-hidden px-4 pt-4 md:pt-0 ${isPlayerExpand ? 'gap-2' : 'gap-4'}`}
      >
        <Menubar />
        <div
          className={`[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground flex-1 overflow-y-auto transition-all duration-500 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:cursor-pointer [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent ${
            isPlayerExpand
              ? 'invisible w-0 flex-none scale-80 opacity-0'
              : 'bg-sidebar flex-1 scale-100 rounded-md opacity-100'
          }`}
        >
          {children}
        </div>
        <Playerbar />
      </div>
      <MusicPlayer />
      <MobileNav />
    </div>
  );
}
