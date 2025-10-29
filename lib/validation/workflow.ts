import z from "zod/v3";

export const createWorkflowSchema = z.object({
  name: z
    .string({
      required_error: "Workflow name is required",
    })
    .min(1, "Workflow name cannot be empty")
    .max(50, "Workflow name must be at most 50 characters"),
  description: z
    .string()
    .max(80, "Description must be at most 80 characters")
    .optional(),
});

export type WorkflowInputs = z.infer<typeof createWorkflowSchema>;
