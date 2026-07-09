"use client";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import AuthCard from "./auth-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import FormSuccess from "./form-success";
import FormError from "./form-error";
import { NewPasswordSchema } from "@/types/new-password-schema";
import NewPassword from "@/server/actions/new-password";
import { ResetPasswordSchema } from "@/types/reset-password-schema";
import { passwordReset } from "@/server/actions/password-reset";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { execute, status } = useAction(passwordReset, {
    onSuccess({ data }) {
      if (data?.error) setError(data.error);
      if (data?.success) setSuccess(data.success);
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Enter email to reset Password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <form id="reset-password" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="mt-5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
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
            form="reset-password"
            variant={"outline"}
            className={cn(status === "executing" ? "animate-pulse " : "")}
          >
            Reset Password
          </Button>
        </Field>
      </form>
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}
    </AuthCard>
  );
};

export default ResetPasswordForm;
