"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
type BackButtonProps = {
  href: string;
  label: string;
};

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div className="w-full mt-5">
      <Button className="font-medium w-full" asChild variant={"ghost"}>
        <Link href={href} aria-label={label}>
          {label}
        </Link>
      </Button>
    </div>
  );
};

export default BackButton;
