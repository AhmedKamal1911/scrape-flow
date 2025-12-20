import { requireAuth } from "@/lib/helper-utils/require-auth";
import { getUserCredentialByName } from "@/lib/queries/workflow/get-user-credential-by-name";

export async function getUserCredentialUsecase(credentialName: string) {
  const { userId } = await requireAuth();
  return await getUserCredentialByName({
    credentialName,
    userId,
  });
}
