import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("authjs.session-token") || 
                  request.cookies.get("__Secure-authjs.session-token");

  if (!session && (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/appointments'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/appointments/:path*"],
};