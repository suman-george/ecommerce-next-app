"use client";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import AuthCard from "./auth-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/types/login-schema";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "../ui/button";
import Link from "next/link";
import { emailSignIn } from "@/server/actions/email-sign-in";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import FormSuccess from "./form-success";
import FormError from "./form-error";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  console.log("showTwoFactor", showTwoFactor);

  const { execute, status } = useAction(emailSignIn, {
    onSuccess({ data }) {
      if (data?.error) {
        setError(data.error);
        setSuccess("");
      }
      if (data?.success) {
        setSuccess(data.success);
        setError("");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
      if (data?.twoFactor) {
        setShowTwoFactor(true);
        setSuccess(data.twoFactor);
        setError("");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Welcome back!"
      showSocials
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
    >
      <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="mt-5">
          {!showTwoFactor && (
            <>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-title">Email Address</FieldLabel>
                    <Input
                      {...field}
                      id="login-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Email Address"
                      type="email"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="login-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      type="password"
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </>
          )}

          {showTwoFactor && (
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-title">
                    We have sent two factor code
                  </FieldLabel>
                  <InputOTP
                    disabled={status === "executing"}
                    maxLength={6}
                    {...field}
                    id="login-title"
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}
        </FieldGroup>
        <Field orientation="horizontal" className="py-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>

          <Button
            type="submit"
            form="login"
            variant={"outline"}
            className={cn(status === "executing" ? "animate-pulse " : "")}
          >
            {showTwoFactor ? "Verify" : "Login"}
          </Button>
        </Field>
      </form>
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}
      <Button type="button" className="p-0" variant="link">
        <Link href="/auth/reset-password">Forgot Password</Link>
      </Button>
    </AuthCard>
  );
};

export default LoginForm;
