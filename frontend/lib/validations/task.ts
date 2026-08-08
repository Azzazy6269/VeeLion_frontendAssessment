import { z } from "zod";

export const createTaskBodySchema = z
  .object({
    title: z
      .string("Title is required")
      .trim()
      .min(1, "Title cannot be empty"),
    completed: z
      .boolean()
      .optional()
      .default(false),
  })
  .strict();

export const updateTaskBodySchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title cannot be empty if provided")
      .optional(),
    completed: z
      .boolean()
      .optional(),
  })
  .strict()
  .refine((data) => data.title !== undefined || data.completed !== undefined, 
  "At least one supported field (title or completed) must be provided",
  );


export const paramsIdSchema = z.object({
  id: z.string().uuid("Invalid task ID format (must be UUID)"),
  });



export type CreateTaskBodyInput = z.infer<typeof createTaskBodySchema>;
export type UpdateTaskBodyInput = z.infer<typeof updateTaskBodySchema>;
export type paramsIdSchema = z.infer<typeof paramsIdSchema>;