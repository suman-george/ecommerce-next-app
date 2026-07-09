import * as z from "zod";

export const ResetPasswordSchema = z.object({
  email: z.email({
    message: "Please enter a valid email",
  }),
});
