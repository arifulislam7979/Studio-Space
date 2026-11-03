import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;
    const { pathname } = request.nextUrl;

    if (user && (pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    
    const isProtectedRoute =
      pathname.startsWith("/my-listings") ||
      pathname.startsWith("/studios/edit") ||
      pathname.startsWith("/my-bookings") ||
      pathname.startsWith("/add-studio");

    if (!user && isProtectedRoute) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
  
}

export const config = {
  matcher: ["/signin", "/signup","/add-studio", "/my-listings", "/studios/edit/:path*", "/my-bookings"],
};
