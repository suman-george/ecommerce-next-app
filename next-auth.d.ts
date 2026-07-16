import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
  role: string;
  id: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  image: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }
}
