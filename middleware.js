export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/myusers/:path*", "/api/data/:path*", "/api/users/:path*"],
  // Note: /test-users and /api/test-users are NOT included in the matcher
};