import { z } from "zod";

export const createActivityBodySchema = z
  .object({
    action: z
      .string("Action must be a string")
      .trim()
      .min(3, "Action min length is 3")
      .max(255, "Action max length is 255")
      .optional(),
    info: z
      .string("Info must be a string")
      .trim()
      .min(3, "Action min length is 3")
      .max(1000, "Info max length is 1000")
      .optional(),
  })
  .strict();

export type CreateActivityBodyInput = z.infer<typeof createActivityBodySchema>;