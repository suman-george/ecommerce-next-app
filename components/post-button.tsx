"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const PostButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      className=" p-2  disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      Add Post
    </Button>
  );
};

export default PostButton;
