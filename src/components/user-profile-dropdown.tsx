import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LogOut, Moon, Settings, UserCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch.tsx';
import { useTheme } from '@/provider/theme-provider.tsx';
import { AuthQuery } from '@/queries/auth.query.ts';
import { useAppLayout } from '@/hooks/use-layout.ts';

function getInitialName(name?: string) {
  if (!name) return '—';

  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function UserprofileDropdown() {
  const { user } = useAppLayout();
  const logoutMutation = AuthQuery.useLogout();
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-9 rounded-full">
          {getInitialName(user?.username)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="flex items-center gap-4">
          <div className="dark:bg-background flex size-9 items-center justify-center rounded-md border bg-gray-50 text-center">
            <span>{getInitialName(user?.username)}</span>
          </div>
          <div className="text-left">
            <p className="text-md font-medium">{user?.username}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-5 px-5">
          <UserCircle />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-5 px-5">
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between px-5">
          <div className="flex items-center gap-5">
            <Moon />
            <span>Dark Mode</span>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logoutMutation.mutate()}
          variant="destructive"
          className="flex items-center gap-5 px-5"
        >
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
