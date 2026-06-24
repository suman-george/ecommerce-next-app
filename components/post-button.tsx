"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const PostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded-md bg-orange-500 p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      Add Post
    </button>
  );
};

export default PostButton;
