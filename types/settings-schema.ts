import React from "react";
import z from "zod";

const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.email()).or(z.literal("")),
    image: z.optional(z.string()),
    role: z.optional(z.string()),
    password: z.optional(z.string().min(6)).or(z.literal("")),
    newPassword: z.optional(z.string().min(6)).or(z.literal("")),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "New password is required", path: ["newPassword"] },
  );

export default SettingsSchema;
