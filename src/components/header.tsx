import { AudioLines, Search } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { UserprofileDropdown } from '@/components/user-profile-dropdown.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      navigate(`/home/discover/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="hidden h-fit w-full items-center justify-between gap-8 px-6 pt-4 md:flex">
      <div className="flex items-center gap-2.5">
        <div className="bg-muted rounded-md p-2">
          <AudioLines size={18} className="text-emerald-600" />
        </div>
        <div>
          <span className="text-lg font-bold">Soundtify</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Type here to search..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <UserprofileDropdown />
    </div>
  );
}
