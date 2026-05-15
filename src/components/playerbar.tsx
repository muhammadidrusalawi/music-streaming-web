import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, Expand, Minimize, PanelRightClose } from 'lucide-react';
import VideoPlayer from '@/components/video-player.tsx';
import { PlaylistPanel } from '@/components/playlist-panel.tsx';
import { useAppLayout } from '@/hooks/use-layout.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export function Playerbar() {
  const { isPlayerOpen, setIsPlayerOpen, isPlayerExpand, setIsPlayerExpand } =
    useAppLayout();
  const queue = useSelector((state: RootState) => state.player.queue);
  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong,
  );

  return (
    <div
      className={`bg-sidebar hidden h-full rounded-md transition-all duration-500 ease-in-out lg:block ${
        !isPlayerOpen
          ? 'w-10'
          : isPlayerExpand
            ? 'relative z-10 flex-1'
            : 'relative z-10 w-96'
      }`}
    >
      {!isPlayerOpen ? (
        <div className="flex h-full w-full items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => setIsPlayerOpen(!isPlayerOpen)}
          >
            <ChevronLeft size={30} />
          </Button>
        </div>
      ) : (
        !currentSong && (
          <div className="absolute top-0 left-0 p-2">
            <Button
              variant="ghost"
              onClick={() => setIsPlayerOpen(!isPlayerOpen)}
            >
              <PanelRightClose />
            </Button>
          </div>
        )
      )}

      <div className="flex h-full w-full flex-col">
        {currentSong && (
          <div
            className={`relative w-full p-1 transition-all duration-500 ease-in-out ${
              isPlayerExpand ? 'h-full' : 'h-64'
            }`}
          >
            <VideoPlayer />
            {isPlayerOpen && (
              <div className="absolute top-0 left-0 z-10 flex h-full w-full justify-between rounded-md bg-black/50 p-2 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100">
                <Button
                  variant="ghost"
                  onClick={() => setIsPlayerExpand(!isPlayerExpand)}
                >
                  {isPlayerExpand ? <Minimize /> : <Expand />}
                </Button>

                {!isPlayerExpand && (
                  <Button
                    variant="ghost"
                    onClick={() => setIsPlayerOpen(!isPlayerOpen)}
                  >
                    <PanelRightClose />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {!isPlayerExpand && <PlaylistPanel playlist={queue} title="Up Next" />}
      </div>
    </div>
  );
}
