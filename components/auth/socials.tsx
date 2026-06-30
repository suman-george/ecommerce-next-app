"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const Socials = () => {
  return (
    <div>
      <Button
        onClick={() => {
          signIn("google", {
            callbackUrl: "/",
          });
        }}
      >
        Sign in with Google
      </Button>
      <Button
        onClick={() => {
          signIn("github", { callbackUrl: "/" });
        }}
      >
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default Socials;
