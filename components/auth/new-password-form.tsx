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

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      token: token || "",
    },
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { execute, status } = useAction(NewPassword, {
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
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    execute({ password: values.password, token });
  };

  return (
    <AuthCard
      cardTitle="Enter a new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <form id="new-password" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="mt-5">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-password">New Password</FieldLabel>
                <Input
                  {...field}
                  id="login-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  type="password"
                  autoComplete="new-password"
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
            form="new-password"
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

export default NewPasswordForm;
