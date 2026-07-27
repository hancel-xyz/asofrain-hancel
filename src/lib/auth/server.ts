import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";

// Server Components / Route Handlers read the user's own session (via the
// access-token cookie), as opposed to src/lib/insforge.ts's admin client
// which uses the project API key and has nothing to do with who's logged in.
export async function createInsForgeServerClient() {
  return createServerClient({ cookies: await cookies() });
}

export async function getCurrentAdminUser() {
  try {
    const client = await createInsForgeServerClient();
    const { data } = await client.auth.getCurrentUser();
    return data?.user ?? null;
  } catch (error) {
    // Fail closed (show the login form) instead of crashing the whole
    // /admin layout — e.g. if NEXT_PUBLIC_INSFORGE_URL/ANON_KEY are missing
    // in this environment, createServerClient() throws synchronously.
    console.error("getCurrentAdminUser failed:", error);
    return null;
  }
}
