"use server";

import { createSafeActionClient } from "next-safe-action";
import db from "../index";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcryptjs";
import {
  generatEmailVerificationToken,
  generatPasswordResetToken,
} from "./tokens";
import {
  sendPasswordResetVerificationEmail,
  sendVerificationEmail,
} from "./emails";
import { ResetPasswordSchema } from "@/types/reset-password-schema";

const action = createSafeActionClient();

export const passwordReset = action
  .schema(ResetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) {
      return { error: "Email doesn't exist" };
    }

    const passwordResetToken = await generatPasswordResetToken(email);
    if (!passwordResetToken) {
      return { error: "Token not generated" };
    }
    if (passwordResetToken) {
      await sendPasswordResetVerificationEmail(
        passwordResetToken.email,
        passwordResetToken.token,
      );
    }

    return { success: "Reset email sent" };
  });
