import { NextRequest, NextResponse } from "next/server";
import { paths } from "./config/paths";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAccessToken = request.cookies.has("access_token");
  const hasRefreshToken = request.cookies.has("refresh_token");

  // If trying to access dashboard but have NO tokens at all
  if (
    pathname.startsWith("/dashboard") &&
    !hasAccessToken &&
    !hasRefreshToken
  ) {
    const url = new URL(paths.auth.login.getHref(), request.url);
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // If already logged in (have access token), don't show login page
  if (pathname.startsWith("/auth/login") && hasAccessToken) {
    return NextResponse.redirect(
      new URL(paths.dashboard.root.getHref(), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).+)"],
};
