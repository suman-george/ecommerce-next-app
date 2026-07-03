"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Ecommerce App Email Confirmation",
    html: `<p>Click to <a href="${confirmLink}">confirm your email</a></p>`,
  });
  if (error) return console.log(error);
  if (data) return data;
};
