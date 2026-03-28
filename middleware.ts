import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token")?.value || 
                request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') || 
                      request.nextUrl.pathname.startsWith('/appointments');

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/appointments/:path*"],
}