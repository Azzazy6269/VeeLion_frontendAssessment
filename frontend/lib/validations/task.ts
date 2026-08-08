import { z } from "zod";

export const createTaskBodySchema = z
  .object({
    title: z
      .string("Title is required")
      .trim()
      .min(3, "Title min length = 3")
      .max(255, "Title max length = 255"),
    completed: z
      .boolean("Completed must be boolean")
      .optional()
      .default(false),
  })
  .strict();

export const updateTaskBodySchema = z
  .object({
    title: z
      .string("Title must be string")
      .trim()
      .min(3, "Title min length = 3")
      .max(255, "Title max length = 255")
      .optional(),
    completed: z
      .boolean("Completed must be boolean")
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