import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware is running");

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token?.id_role !== process.env.NEXT_PUBLIC_USER_ID &&
      req.nextauth.token?.id_role !== process.env.NEXT_PUBLIC_ADMIN_ID
    ) {
      console.error("Unauthorized");
      return NextResponse.rewrite(new URL("/login", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.id_role !== process.env.NEXT_PUBLIC_ADMIN_ID
    ) {
      console.error("Unauthorized: You are not admin");
      return NextResponse.rewrite(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
