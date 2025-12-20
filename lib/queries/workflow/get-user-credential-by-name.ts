import prisma from "@/lib/prisma";
export async function getUserCredentialByName({
  userId,
  credentialName,
}: {
  userId: string;
  credentialName: string;
}) {
  return await prisma.credential.findFirst({
    where: {
      userId,
      name: credentialName,
    },
  });
}
