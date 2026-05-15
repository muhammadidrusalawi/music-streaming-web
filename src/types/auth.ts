import type { User } from '@/types/user.ts';

export interface AuthResponse {
  user: User;
  token: string;
}
