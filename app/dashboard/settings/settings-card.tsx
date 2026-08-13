"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import SettingsSchema from "@/types/settings-schema";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { setting } from "@/server/actions/settings";
import { UploadButton } from "@/app/api/uploadthing/uploadthing";

const SettingCard = ({ session }: { session: Session }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000); // clears success message after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const { execute, status } = useAction(setting, {
    onSuccess({ data }) {
      if (data?.error) setError(data.error);
      if (data?.success) setSuccess(data.success);
    },
  });

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session.user?.name || "",
      email: session.user?.email || "",
      isTwoFactorEnabled: session?.user?.isTwoFactorEnabled || false,
      image: session.user?.image || "",
      password: undefined,
      newPassword: undefined,
    },
  });

  console.log("Form errors:", form.formState.errors);

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    execute(values);
    console.log("values", values);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Settings</CardTitle>
        <CardDescription>Update your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-settings"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Suman"
                    autoComplete="off"
                    disabled={status === "executing"}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    disabled={status === "executing" || session.user.isOAuth}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-new-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    disabled={status === "executing" || session.user.isOAuth}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Avatar</FieldLabel>
                  <div className="flex gap-4">
                    {!form.getValues("image") && (
                      <div className="font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {form.getValues("image") && (
                      <Image
                        src={form.getValues("image")!}
                        alt="user image"
                        width={42}
                        height={42}
                        className="rounded-full"
                      ></Image>
                    )}
                  </div>
                  <Input
                    {...field}
                    id="form-image"
                    type="hidden"
                    aria-invalid={fieldState.invalid}
                    placeholder="User Image"
                    autoComplete="off"
                    disabled={status === "executing"}
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <UploadButton
            endpoint="avatarUploader"
            className=" ut-button:ring-primary items-baseline ut-button:bg-primary/75 ut-button:hover:bg-primary/100 ut-button:text-center ut-button:transition-all ut-button:duration-500 ut-label:text-secondary ut-label:hidden ut-allowed-content:hidden"
            onUploadBegin={() => {
              setAvatarUploading(true);
            }}
            onUploadError={(error) => {
              form.setError("image", {
                type: "uploadError",
                message: error?.message,
              });
              setAvatarUploading(false);
              return;
            }}
            onClientUploadComplete={(res) => {
              form.setValue("image", res[0].url);
              setAvatarUploading(false);
            }}
            content={{
              button({ ready }) {
                if (avatarUploading) return <div>Uploading...</div>;
                if (ready) return <div>Change Avatar</div>;
                return <div>Uploading...</div>;
              },
            }}
          />
          <FieldGroup>
            <Controller
              name="isTwoFactorEnabled"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  className="justify-between items-center rounded-lg border p-3 shadow-sm"
                  data-invalid={fieldState.invalid}
                >
                  <div className="space-y-0.5">
                    <FieldLabel className="cursor-pointer" htmlFor="two-factor">
                      2 Factor Authentication
                    </FieldLabel>
                    <p className="text-sm text-muted-foreground">
                      Secure your account with two-factor authentication.
                    </p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={status === "executing" || session.user.isOAuth}
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={status === "executing"} type="submit">
            {status === "executing" ? "Updating..." : "Update Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SettingCard;
