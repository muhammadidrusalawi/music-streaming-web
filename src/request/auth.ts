import { z } from 'zod';

export const authRequest = z.object({
  username: z
    .string()
    .min(6, { error: 'Username must be at least 6 characters long' }),

  password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters long' }),
});

export type AuthForm = z.infer<typeof authRequest>;
