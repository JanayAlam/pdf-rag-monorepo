import z from "zod";

export const insertQueryValidationSchema = z.object({
  query: z.string().min(1),
});
