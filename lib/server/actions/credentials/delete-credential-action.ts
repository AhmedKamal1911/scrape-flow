"use server";
import { getUserCredentialUsecase } from "@/lib/dal";
import {
  isErrorType,
  isPrismaError,
} from "@/lib/helper-utils/error-type-guards";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCredentialAction(credentialName: string) {
  try {
    const credential = await getUserCredentialUsecase(credentialName);
    if (!credential) {
      throw new Error("Credential not found");
    }

    await prisma.credential.delete({
      where: {
        userId_name: {
          userId: credential.userId,
          name: credential.name,
        },
      },
    });

    revalidatePath("/dashboard/credentials");
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while deleting your credential."
      );
    }

    if (isErrorType(error)) {
      throw new Error(error.message);
    }

    throw new Error("Internal Server Error");
  }
}
