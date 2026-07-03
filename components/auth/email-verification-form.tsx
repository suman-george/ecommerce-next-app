import { newVerification } from "@/server/actions/tokens";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AuthCard from "./auth-card";
import FormSuccess from "./form-success";
import FormError from "./form-error";

const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleVerification = async () => {
    if (success || error) return;
    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const result = await newVerification(token);
      if (result.error) {
        setError(result.error);
      }
      if (result.success) {
        setSuccess(result.success);
        router.push("/auth/login");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthCard
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      cardTitle="Email Verification"
    >
      <div className="w-full flex justify-center items-center">
        <p>{!success && !error ? "Verifying email..." : ""}</p>
      </div>
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </AuthCard>
  );
};

export default EmailVerificationForm;
