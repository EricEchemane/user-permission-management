import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      permissions?: string[];
      username: string;
      id: number;
    };
  }
  interface User {
    permissions?: string[];
    username?: string;
    id: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions?: string[];
  }
}
