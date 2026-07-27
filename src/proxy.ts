import { NextResponse, type NextRequest } from "next/server";
import { updateSession, type CookieStore } from "@insforge/sdk/ssr/middleware";

// Refreshes the InsForge auth session cookies before Server Components
// render, so /admin's auth check (see src/app/admin/layout.tsx) always sees
// an up-to-date access token instead of a stale/expired one.
export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  await updateSession({
    // Next's RequestCookies/ResponseCookies types don't structurally match
    // CookieStore (differing `set` overload arity) even though both
    // implement the same get/set/delete surface at runtime.
    requestCookies: request.cookies as unknown as CookieStore,
    responseCookies: response.cookies as unknown as CookieStore,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
