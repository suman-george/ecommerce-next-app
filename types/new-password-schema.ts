import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  token: z.string().nullable().optional(),
});
