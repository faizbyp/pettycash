import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware is running");

    const userRoleId = req.nextauth.token?.id_role;
    const url = req.nextUrl.pathname;

    const rolePermissions = {
      [process.env.NEXT_PUBLIC_ADMIN_ID]: [
        "/dashboard",
        "/dashboard/gr",
        "/dashboard/my-gr",
        "/dashboard/my-po",
        "/dashboard/po",
        "/dashboard/company",
        "/dashboard/uom",
        "/dashboard/vendor",
        "/dashboard/approval",
        "/dashboard/reports",
      ],
      [process.env.NEXT_PUBLIC_USER_ID]: [
        "/dashboard",
        "/dashboard/gr",
        "/dashboard/my-gr",
        "/dashboard/my-po",
        "/dashboard/po",
        "/dashboard/company",
        "/dashboard/uom",
        "/dashboard/vendor",
      ],
      [process.env.NEXT_PUBLIC_FINANCE_ID]: ["/dashboard", "/dashboard/reports"],
    };

    // Extract only the pathname from the URL (ignoring the query and hash parts)
    const currentPath = new URL(req.url).pathname;

    // Use a more flexible matching that accounts for dynamic routes
    const isAllowed = rolePermissions[userRoleId]?.some(
      (route) => currentPath === route || currentPath.startsWith(`${route}/`)
    );

    if (!isAllowed) {
      console.error("Unauthorized");
      return NextResponse.rewrite(new URL("/403", req.url));
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
