"use client";

import React from "react";
import AuthCard from "./auth-card";

const LoginForm = () => {
  return (
    <AuthCard
      cardTitle="Welcome back!"
      showSocials
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
    >
      <h1>hey</h1>
    </AuthCard>
  );
};

export default LoginForm;
