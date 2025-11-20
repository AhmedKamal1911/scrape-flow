import "server-only";

import { auth } from "@clerk/nextjs/server";

export async function requireAuth() {
  const session = await auth();

  if (!session.isAuthenticated) return session.redirectToSignIn();
  return session;
}
