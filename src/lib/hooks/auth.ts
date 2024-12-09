// src/hooks/auth.ts
import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Partial<Record<'email' | 'password', unknown>>) {
        const { email, password } = credentials;

        if (email === 'test' && password === 'password') {
          return { id: '1', email: 'test@gmail.com', name: 'Test User' };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: 'randomsecret0123@311',
});
