import { withAuth } from "next-auth/middleware"

export default withAuth(function proxy(_req) {
  // NextAuth handles the session check via withAuth.
  // Return undefined to continue to the route.
}, {
  pages: {
    signIn: "/auth/login",
  },
})

export const config = {
  matcher: ["/protected/:path*", "/admin/:path*"],
}
