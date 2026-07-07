"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import db from "../index";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generatEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./emails";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";

const action = createSafeActionClient();

export const emailSignIn = action
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users?.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: "Email not found" };
      }

      console.log(email, password, code);

      if (!existingUser.emailVerified) {
        const verificationToken = await generatEmailVerificationToken(email);

        await sendVerificationEmail(email, verificationToken.token);
        return { success: "Please verify your email" };
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
      });
      return { success: "User Signed In" };
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "AccessDenied":
            return { error: error?.message };
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" };
          case "EmailSignInError":
            return { error: error?.message };
          case "OAuthSignInError":
            return { error: error?.message };
          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
  });
