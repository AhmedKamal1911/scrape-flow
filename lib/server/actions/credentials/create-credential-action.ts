"use server";

import { symmetricEncrypt } from "@/lib/encryption";
import {
  isErrorType,
  isPrismaError,
} from "@/lib/helper-utils/error-type-guards";
import { requireAuth } from "@/lib/helper-utils/require-auth";
import prisma from "@/lib/prisma";
import {
  createCredentialSchema,
  CredentialsInputs,
} from "@/lib/validation/credential";
import { revalidatePath } from "next/cache";

export async function createCredentialAction(inputs: CredentialsInputs) {
  const { success, data } = createCredentialSchema.safeParse(inputs);

  if (!success) {
    throw new Error("Invalid credential data");
  }

  try {
    const { userId } = await requireAuth();
    const isCredentialExist = await prisma.credential.findFirst({
      where: {
        name: data.name,
        userId,
      },
    });

    if (isCredentialExist) {
      throw new Error("Credential already exists");
    }
    const encryptedValue = symmetricEncrypt(data.value);
    await prisma.credential.create({
      data: {
        userId,
        name: data.name,
        secret: encryptedValue,
      },
    });

    revalidatePath("/dashboard/credentials");
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while creating your credential."
      );
    }

    if (isErrorType(error)) {
      throw new Error(error.message);
    }

    throw new Error("Internal Server Error");
  }
}
