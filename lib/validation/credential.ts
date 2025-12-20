import z from "zod/v3";

export const createCredentialSchema = z.object({
  name: z
    .string({ message: "Credential name is required" })
    .max(30, "Credential name must be at most 30 characters"),
  value: z
    .string({ message: "Credential value is required" })
    .max(500, "Credential value must be at most 500 characters"),
});

export type CredentialsInputs = z.infer<typeof createCredentialSchema>;
