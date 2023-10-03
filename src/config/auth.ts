import { prisma } from '@/prisma';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        });

        if (!user || credentials?.password !== user.password) return null;

        return {
          id: user.id.toString(),
          name: user.username,
          email: 'eechemane29@gmail.com',
        };
      },
    }),
  ],
  session: {
    maxAge: 1400,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
