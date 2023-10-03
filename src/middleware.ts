import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });

  if (pathname === '/login') {
    return token ? NextResponse.redirect(request.url) : NextResponse.next();
  }

  if (!token) {
    const destination = `${pathname}?${searchParams.toString()}`;
    const response = NextResponse.redirect(
      new URL(
        `/login?redirect-to=${encodeURIComponent(destination)}`,
        request.url
      )
    );
    return response;
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
