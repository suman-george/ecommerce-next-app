"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

import { FaGithub, FaGoogle } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4 pb-5 pt-5">
      <Button
        className=" flex gap-4 w-full"
        variant="outline"
        onClick={() => {
          signIn("google", {
            callbackUrl: "/",
          });
        }}
      >
        <p> Sign in with Google </p>
        <FaGoogle className="size-5" />
      </Button>
      <Button
        className=" flex gap-4 w-full"
        variant="outline"
        onClick={() => {
          signIn("github", { callbackUrl: "/" });
        }}
      >
        <p>Sign in with GitHub</p>
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};

export default Socials;
