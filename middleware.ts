import type { NextRequest } from "next/server";
import { isLogin } from "./firebase/authentication";

export function middleware(request: NextRequest) {
  // if (!isLogin() && !request.nextUrl.pathname.startsWith('/login')) {
  //   return Response.redirect(new URL('/login', request.url));
  // }

  // if (isLogin() && request.nextUrl.pathname.startsWith('/login')) {
  //   return Response.redirect(new URL('/', request.url));
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
