import { ChevronLeft, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <h1 className="text-[12rem] leading-none font-black select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Ghost
                size={80}
                className="animate-bounce text-emerald-600"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Oops! Page Not Found
        </h2>
        <p className="text-muted-foreground mx-auto mb-10 max-w-md text-lg">
          It seems the page you are looking for has been moved, deleted, or may
          never have existed.
        </p>

        <Button variant="outline" onClick={() => window.history.back()}>
          <ChevronLeft />
          Go Back
        </Button>
      </div>
    </div>
  );
}
