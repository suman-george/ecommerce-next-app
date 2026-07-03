"use server";

import { createSafeActionClient } from "next-safe-action";
import db from "../index";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { generatEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./emails";

const action = createSafeActionClient();

export const emailRegister = action
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hashedpassword");
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser?.email === email) {
      //   if (!existingUser.emailVerified) {
      //     return { error: "Please verify your email" };
      //   }
      return { error: "Email already exists" };
    }
    if (existingUser) {
      if (!existingUser?.emailVerified) {
        const verificationToken = await generatEmailVerificationToken(email);
        if (verificationToken) {
          await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
          );
        }
        return {
          success: "Email Confirmation resent",
        };
      }

      return {
        error: "Email already in use",
      };
    }

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    const verificationToken = await generatEmailVerificationToken(email);
    if (verificationToken) {
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
    }

    return { success: "Confirmation email sent" };
  });
