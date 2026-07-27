import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";

// Server Components / Route Handlers read the user's own session (via the
// access-token cookie), as opposed to src/lib/insforge.ts's admin client
// which uses the project API key and has nothing to do with who's logged in.
export async function createInsForgeServerClient() {
  return createServerClient({ cookies: await cookies() });
}

export async function getCurrentAdminUser() {
  const client = await createInsForgeServerClient();
  const { data } = await client.auth.getCurrentUser();
  return data?.user ?? null;
}
