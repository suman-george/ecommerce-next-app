"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import db from "../index";
import { eq } from "drizzle-orm";
import { twoFactorTokens, users } from "../schema";
import {
  generatEmailVerificationToken,
  generateTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "./tokens";
import { sendTwoFactorEmail, sendVerificationEmail } from "./emails";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { error } from "console";
import bcrypt from "bcryptjs";

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

      if (!existingUser.password) {
        return { error: "Please login with Google or GitHub" };
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!passwordMatch) {
        return { error: "Password Incorrect" };
      }

      if (!existingUser.emailVerified) {
        const verificationToken = await generatEmailVerificationToken(email);

        await sendVerificationEmail(email, verificationToken.token);
        return { success: "Please verify your email" };
      }

      if (existingUser.twoFactorEnabled && existingUser.email) {
        if (code) {
          const twoFactorToken = await getTwoFactorTokenByEmail(
            existingUser.email,
          );

          if (!twoFactorToken) {
            return { error: "Invalid Token" };
          }

          if (twoFactorToken?.token !== code) {
            return { error: "Invalid verification code" };
          }
          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if (hasExpired) {
            return { error: "Token Expired, Please resend the code" };
          }
          await db
            .delete(twoFactorTokens)
            .where(eq(twoFactorTokens.id, twoFactorToken.id));
        } else {
          const token = await generateTwoFactorToken(existingUser.email);
          if (!token) {
            return { error: "Failed to generate 2FA token" };
          }
          await sendTwoFactorEmail(token.email, token.token);
          return { twoFactor: "Two Factor Token Sent!" };
        }
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
