"use client";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import AuthCard from "./auth-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/types/register-schema";

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
import { emailRegister } from "@/server/actions/email-register";
import FormSuccess from "./form-success";
import FormError from "./form-error";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { execute, status } = useAction(emailRegister, {
    onSuccess({ data }) {
      if (data?.error) setError(data.error);
      if (data?.success) setSuccess(data.success);
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Create an account"
      showSocials
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
    >
      <form id="register" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="mt-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-title">Name</FieldLabel>
                <Input
                  {...field}
                  id="login-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Name"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
        </FieldGroup>
        <Field orientation="horizontal" className="py-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>

          <Button
            type="submit"
            form="register"
            variant={"outline"}
            className={cn(status === "executing" ? "animate-pulse " : "")}
          >
            Register
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

export default RegisterForm;
